package com.assessment.edgeviewer

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.assessment.edgeviewer.databinding.ActivityMainBinding
import com.assessment.edgeviewer.gl.GLRenderer
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService
    private lateinit var glRenderer: GLRenderer
    
    private var imageAnalysis: ImageAnalysis? = null
    private var isEdgeDetectionMode = false
    
    companion object {
        private const val REQUEST_CODE_PERMISSIONS = 10
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize native library
        NativeProcessor.init()

        // Setup OpenGL renderer
        glRenderer = GLRenderer(this)
        binding.glSurfaceView.setEGLContextClientVersion(2)
        binding.glSurfaceView.setRenderer(glRenderer)
        binding.glSurfaceView.renderMode = android.opengl.GLSurfaceView.RENDERMODE_WHEN_DIRTY

        // Setup camera executor
        cameraExecutor = Executors.newSingleThreadExecutor()

        // Setup toggle button
        binding.toggleButton.setOnClickListener {
            isEdgeDetectionMode = !isEdgeDetectionMode
            updateModeText()
        }

        // Check permissions and start camera
        if (allPermissionsGranted()) {
            startCamera()
        } else {
            ActivityCompat.requestPermissions(
                this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS
            )
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder()
                .build()

            imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_YUV_420_888)
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, FrameAnalyzer())
                }

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this, cameraSelector, imageAnalysis
                )
            } catch (exc: Exception) {
                Toast.makeText(this, "Camera binding failed: ${exc.message}", 
                    Toast.LENGTH_SHORT).show()
            }

        }, ContextCompat.getMainExecutor(this))
    }

    private fun updateModeText() {
        binding.modeText.text = if (isEdgeDetectionMode) {
            getString(R.string.edge_detected)
        } else {
            getString(R.string.raw_feed)
        }
    }

    private inner class FrameAnalyzer : ImageAnalysis.Analyzer {
        private var frameCount = 0
        private var lastFpsTime = System.currentTimeMillis()
        private var fps = 0.0

        override fun analyze(image: ImageProxy) {
            val startTime = System.currentTimeMillis()

            // Convert ImageProxy to byte array
            val yBuffer = image.planes[0].buffer
            val uBuffer = image.planes[1].buffer
            val vBuffer = image.planes[2].buffer

            val ySize = yBuffer.remaining()
            val uSize = uBuffer.remaining()
            val vSize = vBuffer.remaining()

            val nv21 = ByteArray(ySize + uSize + vSize)

            yBuffer.get(nv21, 0, ySize)
            vBuffer.get(nv21, ySize, vSize)
            uBuffer.get(nv21, ySize + vSize, uSize)

            // Process frame
            val processedData = if (isEdgeDetectionMode) {
                NativeProcessor.processFrame(
                    nv21,
                    image.width,
                    image.height,
                    true
                )
            } else {
                NativeProcessor.processFrame(
                    nv21,
                    image.width,
                    image.height,
                    false
                )
            }

            // Update texture
            glRenderer.updateTexture(processedData, image.width, image.height)
            binding.glSurfaceView.requestRender()

            // Calculate FPS
            frameCount++
            val currentTime = System.currentTimeMillis()
            if (currentTime - lastFpsTime >= 1000) {
                fps = frameCount * 1000.0 / (currentTime - lastFpsTime)
                frameCount = 0
                lastFpsTime = currentTime

                runOnUiThread {
                    binding.fpsText.text = getString(R.string.fps_label, fps)
                }
            }

            val processingTime = System.currentTimeMillis() - startTime
            runOnUiThread {
                binding.processingTimeText.text = 
                    getString(R.string.processing_time, processingTime)
            }

            image.close()
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (allPermissionsGranted()) {
                startCamera()
            } else {
                Toast.makeText(
                    this,
                    getString(R.string.camera_permission_required),
                    Toast.LENGTH_SHORT
                ).show()
                finish()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }
}
