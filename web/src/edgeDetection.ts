import * as cv from 'opencv-ts';

export class EdgeDetector {
    private static instance: EdgeDetector;
    private openCvReady: boolean = false;

    private constructor() {
        // Initialize OpenCV
        this.initializeOpenCV();
    }

    public static getInstance(): EdgeDetector {
        if (!EdgeDetector.instance) {
            EdgeDetector.instance = new EdgeDetector();
        }
        return EdgeDetector.instance;
    }

    private initializeOpenCV(): void {
        // @ts-ignore - OpenCV is loaded via script tag
        if (window.cv) {
            this.openCvReady = true;
            console.log('OpenCV is ready');
        } else {
            console.error('OpenCV not loaded');
        }
    }

    public async detectEdges(imageData: ImageData): Promise<ImageData> {
        if (!this.openCvReady) {
            throw new Error('OpenCV is not ready');
        }

        // @ts-ignore - OpenCV types
        const src = cv.matFromImageData(imageData);
        const dst = new cv.Mat();
        const edges = new cv.Mat();

        try {
            // Convert to grayscale
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            
            // Apply Gaussian blur to reduce noise
            cv.GaussianBlur(dst, dst, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT);
            
            // Canny edge detection
            cv.Canny(dst, edges, 50, 150, 3, false);
            
            // Convert back to RGBA
            cv.cvtColor(edges, dst, cv.COLOR_GRAY2RGBA);
            
            // Create and return new ImageData
            const result = new ImageData(
                new Uint8ClampedArray(dst.data),
                dst.cols,
                dst.rows
            );
            
            return result;
        } finally {
            src.delete();
            dst.delete();
            edges.delete();
        }
    }

    public isReady(): boolean {
        return this.openCvReady;
    }
}
