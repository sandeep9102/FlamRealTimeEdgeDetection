package com.assessment.edgeviewer

/**
 * JNI interface for native OpenCV processing
 */
object NativeProcessor {
    init {
        System.loadLibrary("native-processor")
    }

    /**
     * Initialize native library
     */
    external fun init(): Boolean

    /**
     * Process camera frame
     * @param data YUV frame data
     * @param width Frame width
     * @param height Frame height
     * @param applyEdgeDetection Whether to apply Canny edge detection
     * @return Processed RGBA frame data
     */
    external fun processFrame(
        data: ByteArray,
        width: Int,
        height: Int,
        applyEdgeDetection: Boolean
    ): ByteArray

    /**
     * Get library version
     */
    external fun getVersion(): String
}
