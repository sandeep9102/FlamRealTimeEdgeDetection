/**
 * Edge Detection Web Viewer
 * TypeScript-based web interface for viewing processed frames
 */

import { FrameViewer } from './frameViewer.js';
import { StatsManager } from './statsManager.js';
import { MockAPIServer } from './mockAPI.js';

class Application {
    private frameViewer: FrameViewer;
    private statsManager: StatsManager;
    private mockAPI: MockAPIServer;

    constructor() {
        this.frameViewer = new FrameViewer('frameCanvas');
        this.statsManager = new StatsManager();
        this.mockAPI = new MockAPIServer();

        this.initialize();
    }

    private initialize(): void {
        console.log('🚀 Edge Detection Viewer initialized');

        // Setup event listeners
        this.setupEventListeners();

        // Load sample frame
        this.loadSampleFrame();

        // Start stats update loop
        this.startStatsLoop();
    }

    private setupEventListeners(): void {
        const loadSampleBtn = document.getElementById('loadSampleBtn');
        const toggleModeBtn = document.getElementById('toggleModeBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        loadSampleBtn?.addEventListener('click', () => {
            this.loadSampleFrame();
        });

        toggleModeBtn?.addEventListener('click', () => {
            this.toggleMode();
        });

        uploadBtn?.addEventListener('click', () => {
            fileInput?.click();
        });

        fileInput?.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                this.loadImageFile(target.files[0]);
            }
        });
    }

    private loadSampleFrame(): void {
        // Create a sample edge-detected pattern
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1e1e1e');
            gradient.addColorStop(1, '#121212');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw sample edge pattern
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;

            // Draw some geometric shapes to simulate edges
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 50 + 20;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Draw text
            ctx.fillStyle = '#00ff00';
            ctx.font = '24px monospace';
            ctx.fillText('Sample Edge Detection Frame', 20, 40);
            ctx.font = '16px monospace';
            ctx.fillText('640x480 | Canny Edge Detection', 20, 70);

            canvas.toBlob((blob) => {
                if (blob) {
                    this.frameViewer.displayFrame(blob);
                    this.statsManager.incrementFrameCount();
                    this.statsManager.updateProcessingTime(Math.random() * 20 + 10);
                }
            });
        }
    }

    private loadImageFile(file: File): void {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const blob = new Blob([e.target.result], { type: file.type });
                this.frameViewer.displayFrame(blob);
                this.statsManager.incrementFrameCount();
            }
        };
        reader.readAsArrayBuffer(file);
    }

    private toggleMode(): void {
        const currentMode = this.statsManager.getMode();
        const newMode = currentMode === 'Raw Feed' ? 'Edge Detected' : 'Raw Feed';
        this.statsManager.setMode(newMode);
        
        // Reload frame with new mode
        this.loadSampleFrame();
    }

    private startStatsLoop(): void {
        setInterval(() => {
            this.statsManager.updateFPS();
            this.statsManager.render();
        }, 100);
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Application();
    });
} else {
    new Application();
}
