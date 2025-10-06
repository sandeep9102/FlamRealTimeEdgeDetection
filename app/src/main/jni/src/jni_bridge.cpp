#include "native_processor.h"
#include <memory>

using namespace EdgeViewer;

// Global processor instance
static std::unique_ptr<FrameProcessor> g_processor;

extern "C" {

JNIEXPORT jboolean JNICALL
Java_com_assessment_edgeviewer_NativeProcessor_init(JNIEnv* env, jobject /* this */) {
    try {
        g_processor = std::make_unique<FrameProcessor>();
        LOGI("Native processor initialized successfully");
        return JNI_TRUE;
    } catch (const std::exception& e) {
        LOGE("Failed to initialize native processor: %s", e.what());
        return JNI_FALSE;
    }
}

JNIEXPORT jbyteArray JNICALL
Java_com_assessment_edgeviewer_NativeProcessor_processFrame(
    JNIEnv* env,
    jobject /* this */,
    jbyteArray data,
    jint width,
    jint height,
    jboolean applyEdgeDetection
) {
    if (!g_processor) {
        LOGE("Processor not initialized");
        return nullptr;
    }

    // Get input data
    jbyte* inputData = env->GetByteArrayElements(data, nullptr);
    if (!inputData) {
        LOGE("Failed to get input data");
        return nullptr;
    }

    // Process frame
    std::vector<uint8_t> result = g_processor->processFrame(
        reinterpret_cast<const uint8_t*>(inputData),
        width,
        height,
        applyEdgeDetection == JNI_TRUE
    );

    // Release input data
    env->ReleaseByteArrayElements(data, inputData, JNI_ABORT);

    // Create output array
    if (result.empty()) {
        LOGE("Processing failed, empty result");
        return nullptr;
    }

    jbyteArray outputArray = env->NewByteArray(result.size());
    if (!outputArray) {
        LOGE("Failed to create output array");
        return nullptr;
    }

    env->SetByteArrayRegion(
        outputArray,
        0,
        result.size(),
        reinterpret_cast<const jbyte*>(result.data())
    );

    return outputArray;
}

JNIEXPORT jstring JNICALL
Java_com_assessment_edgeviewer_NativeProcessor_getVersion(JNIEnv* env, jobject /* this */) {
    std::string version = "OpenCV " + std::string(CV_VERSION);
    return env->NewStringUTF(version.c_str());
}

} // extern "C"
