/**
 * Mock API Server - Simulates WebSocket/HTTP endpoint for receiving frames
 */

export interface FrameData {
    image: string; // base64 encoded
    width: number;
    height: number;
    timestamp: number;
    mode: 'raw' | 'edge';
}

export class MockAPIServer {
    private isConnected: boolean = false;
    private endpoint: string = '/api/frame';

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        console.log('📡 Mock API Server initialized');
        console.log(`Endpoint: POST ${this.endpoint}`);
        
        // Simulate connection
        setTimeout(() => {
            this.isConnected = true;
            this.updateStatus('Connected', true);
        }, 500);
    }

    /**
     * Simulate receiving a frame from Android app
     */
    public receiveFrame(frameData: FrameData): void {
        console.log('📥 Received frame:', {
            size: `${frameData.width}x${frameData.height}`,
            mode: frameData.mode,
            timestamp: new Date(frameData.timestamp).toISOString()
        });

        // In a real implementation, this would:
        // 1. Validate the frame data
        // 2. Process/store the frame
        // 3. Trigger UI update
        // 4. Send acknowledgment back to Android
    }

    /**
     * Simulate WebSocket connection
     */
    public connectWebSocket(): void {
        console.log('🔌 WebSocket connection simulated');
        // In a real implementation, this would establish a WebSocket connection
        // to receive real-time frames from the Android app
    }

    /**
     * Update API status indicator
     */
    private updateStatus(message: string, isConnected: boolean): void {
        const statusText = document.getElementById('apiStatusText');
        const statusIndicator = document.getElementById('apiStatus');

        if (statusText) {
            statusText.textContent = message;
        }

        if (statusIndicator) {
            statusIndicator.style.background = isConnected 
                ? 'var(--success-color)' 
                : 'var(--error-color)';
        }
    }

    /**
     * Get API endpoint info
     */
    public getEndpointInfo(): { endpoint: string; connected: boolean } {
        return {
            endpoint: this.endpoint,
            connected: this.isConnected
        };
    }

    /**
     * Simulate frame upload from Android
     */
    public async uploadFrame(imageData: Blob): Promise<boolean> {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                console.log('✅ Frame uploaded successfully');
                resolve(true);
            }, 100);
        });
    }
}
