/**
 * Stats Manager - Handles frame statistics and display
 */

export class StatsManager {
    private fps: number = 0;
    private processingTime: number = 0;
    private mode: string = 'Raw Feed';
    private frameCount: number = 0;
    private lastFrameTime: number = Date.now();
    private frameTimestamps: number[] = [];

    constructor() {
        this.render();
    }

    /**
     * Update FPS calculation
     */
    public updateFPS(): void {
        const now = Date.now();
        this.frameTimestamps.push(now);

        // Keep only timestamps from the last second
        this.frameTimestamps = this.frameTimestamps.filter(
            timestamp => now - timestamp < 1000
        );

        this.fps = this.frameTimestamps.length;
    }

    /**
     * Update processing time
     */
    public updateProcessingTime(time: number): void {
        this.processingTime = Math.round(time);
    }

    /**
     * Set current mode
     */
    public setMode(mode: string): void {
        this.mode = mode;
    }

    /**
     * Get current mode
     */
    public getMode(): string {
        return this.mode;
    }

    /**
     * Increment frame count
     */
    public incrementFrameCount(): void {
        this.frameCount++;
        this.updateFPS();
    }

    /**
     * Render stats to DOM
     */
    public render(): void {
        this.updateElement('fpsValue', this.fps.toFixed(1));
        this.updateElement('processingTime', `${this.processingTime} ms`);
        this.updateElement('modeValue', this.mode);
        this.updateElement('frameCount', this.frameCount.toString());
    }

    /**
     * Update DOM element text content
     */
    private updateElement(id: string, value: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    /**
     * Reset all stats
     */
    public reset(): void {
        this.fps = 0;
        this.processingTime = 0;
        this.frameCount = 0;
        this.frameTimestamps = [];
        this.render();
    }

    /**
     * Get stats as object
     */
    public getStats(): {
        fps: number;
        processingTime: number;
        mode: string;
        frameCount: number;
    } {
        return {
            fps: this.fps,
            processingTime: this.processingTime,
            mode: this.mode,
            frameCount: this.frameCount
        };
    }
}
