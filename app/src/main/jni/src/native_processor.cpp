#include "native_processor.h"
#include <chrono>

namespace EdgeViewer {

FrameProcessor::FrameProcessor()
    : cannyThreshold1_(50.0)
    , cannyThreshold2_(150.0)
    , cannyApertureSize_(3) {
    LOGI("FrameProcessor initialized");
}

FrameProcessor::~FrameProcessor() {
    LOGI("FrameProcessor destroyed");
}

cv::Mat FrameProcessor::convertYUVtoRGB(const uint8_t* yuvData, int width, int height) {
    // Create YUV Mat
    cv::Mat yuvMat(height + height / 2, width, CV_8UC1, (void*)yuvData);
    
    // Convert to RGB
    cv::Mat rgbMat;
    cv::cvtColor(yuvMat, rgbMat, cv::COLOR_YUV2RGB_NV21);
    
    return rgbMat;
}

cv::Mat FrameProcessor::applyCannyEdgeDetection(const cv::Mat& input) {
    cv::Mat gray, edges, result;
    
    // Convert to grayscale if needed
    if (input.channels() == 3) {
        cv::cvtColor(input, gray, cv::COLOR_RGB2GRAY);
    } else {
        gray = input.clone();
    }
    
    // Apply Gaussian blur to reduce noise
    cv::GaussianBlur(gray, gray, cv::Size(5, 5), 1.5);
    
    // Apply Canny edge detection
    cv::Canny(gray, edges, cannyThreshold1_, cannyThreshold2_, cannyApertureSize_);
    
    // Convert back to RGB for display
    cv::cvtColor(edges, result, cv::COLOR_GRAY2RGB);
    
    return result;
}

std::vector<uint8_t> FrameProcessor::processFrame(
    const uint8_t* yuvData,
    int width,
    int height,
    bool applyEdgeDetection
) {
    auto startTime = std::chrono::high_resolution_clock::now();
    
    try {
        // Convert YUV to RGB
        cv::Mat rgbMat = convertYUVtoRGB(yuvData, width, height);
        
        cv::Mat processedMat;
        
        if (applyEdgeDetection) {
            // Apply edge detection
            processedMat = applyCannyEdgeDetection(rgbMat);
        } else {
            // Use raw RGB
            processedMat = rgbMat;
        }
        
        // Convert to RGBA for OpenGL
        cv::Mat rgbaMat;
        cv::cvtColor(processedMat, rgbaMat, cv::COLOR_RGB2RGBA);
        
        // Convert to vector
        std::vector<uint8_t> result(rgbaMat.data, rgbaMat.data + rgbaMat.total() * rgbaMat.elemSize());
        
        auto endTime = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(endTime - startTime);
        
        LOGD("Frame processed in %lld ms (Edge detection: %s)", 
             duration.count(), 
             applyEdgeDetection ? "ON" : "OFF");
        
        return result;
        
    } catch (const cv::Exception& e) {
        LOGE("OpenCV exception: %s", e.what());
        return std::vector<uint8_t>();
    } catch (const std::exception& e) {
        LOGE("Exception: %s", e.what());
        return std::vector<uint8_t>();
    }
}

} // namespace EdgeViewer
