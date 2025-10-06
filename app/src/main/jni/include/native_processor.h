#ifndef NATIVE_PROCESSOR_H
#define NATIVE_PROCESSOR_H

#include <jni.h>
#include <android/log.h>
#include <opencv2/opencv.hpp>
#include <opencv2/imgproc.hpp>
#include <vector>

#define LOG_TAG "NativeProcessor"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)

namespace EdgeViewer {

class FrameProcessor {
public:
    FrameProcessor();
    ~FrameProcessor();

    /**
     * Process YUV frame and optionally apply edge detection
     * @param yuvData Input YUV420 data
     * @param width Frame width
     * @param height Frame height
     * @param applyEdgeDetection Whether to apply Canny edge detection
     * @return RGBA output data
     */
    std::vector<uint8_t> processFrame(
        const uint8_t* yuvData,
        int width,
        int height,
        bool applyEdgeDetection
    );

    /**
     * Apply Canny edge detection
     * @param input Input grayscale image
     * @return Edge-detected image
     */
    cv::Mat applyCannyEdgeDetection(const cv::Mat& input);

    /**
     * Convert YUV to RGB
     * @param yuvData Input YUV420 data
     * @param width Frame width
     * @param height Frame height
     * @return RGB Mat
     */
    cv::Mat convertYUVtoRGB(const uint8_t* yuvData, int width, int height);

private:
    // Canny edge detection parameters
    double cannyThreshold1_;
    double cannyThreshold2_;
    int cannyApertureSize_;
};

} // namespace EdgeViewer

#endif // NATIVE_PROCESSOR_H
