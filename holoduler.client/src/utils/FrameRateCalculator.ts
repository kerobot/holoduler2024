export class FrameRateCalculator {
    private lastFrameTime: number = 0;
    private frameCount: number = 0;
    private frameRate: number = 0;

    constructor() {
        this.update = this.update.bind(this);
    }

    public start() {
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.frameRate = 0;
        this.update();
    }

    private update() {
        const currentTime = performance.now();
        this.frameCount++;

        const deltaTime = currentTime - this.lastFrameTime;
        if (deltaTime >= 1000) {
            this.frameRate = (this.frameCount / deltaTime) * 1000;
            console.log(`Current Frame Rate: ${this.frameRate.toFixed(2)} fps`);
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }

        window.requestAnimationFrame(this.update);
    }

    public getFrameRate(): number {
        return this.frameRate;
    }
}
