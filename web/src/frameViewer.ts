/**
 * Frame Viewer - Handles canvas rendering and image display
 */

export class FrameViewer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private currentImage: HTMLImageElement | null = null;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }

        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = ctx;
    }

    /**
     * Display a frame from a Blob
     */
    public displayFrame(blob: Blob): void {
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
            this.currentImage = img;
            this.render();
            this.updateResolutionInfo(img.width, img.height);
            URL.revokeObjectURL(url);
        };

        img.onerror = () => {
            console.error('Failed to load image');
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }

    /**
     * Display a frame from base64 data
     */
    public displayFrameFromBase64(base64Data: string): void {
        const img = new Image();

        img.onload = () => {
            this.currentImage = img;
            this.render();
            this.updateResolutionInfo(img.width, img.height);
        };

        img.onerror = () => {
            console.error('Failed to load image from base64');
        };

        img.src = `data:image/png;base64,${base64Data}`;
    }

    /**
     * Render the current image to canvas
     */
    private render(): void {
        if (!this.currentImage) {
            return;
        }

        // Set canvas size to match image
        this.canvas.width = this.currentImage.width;
        this.canvas.height = this.currentImage.height;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw image
        this.ctx.drawImage(this.currentImage, 0, 0);
    }

    /**
     * Update resolution info display
     */
    private updateResolutionInfo(width: number, height: number): void {
        const resolutionElement = document.getElementById('imageResolution');
        if (resolutionElement) {
            resolutionElement.textContent = `Resolution: ${width}x${height}`;
        }
    }

    /**
     * Clear the canvas
     */
    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentImage = null;
    }

    /**
     * Get current canvas as data URL
     */
    public getDataURL(type: string = 'image/png'): string {
        return this.canvas.toDataURL(type);
    }
}
