export interface FrameSequenceOptions {
  folderPath: string;
  filenamePrefix: string;
  filenameSuffix: string;
  totalFrames: number;
  padLength: number;
  initialChunkSize?: number;
}

export class FrameSequenceManager {
  private images: (HTMLImageElement | null)[] = [];
  private loadedCount = 0;
  private options: Required<FrameSequenceOptions>;
  private isPreloading = false;

  constructor(options: FrameSequenceOptions) {
    this.options = {
      initialChunkSize: 20,
      ...options,
    };
    this.images = new Array(this.options.totalFrames).fill(null);
  }

  public getFrameUrl(index: number): string {
    const frameNumber = String(index + 1).padStart(this.options.padLength, '0');
    return `${this.options.folderPath}/${this.options.filenamePrefix}${frameNumber}${this.options.filenameSuffix}`;
  }

  public async preload(
    onProgress?: (progress: number, loadedCount: number, total: number) => void
  ): Promise<void> {
    if (this.isPreloading) return;
    this.isPreloading = true;

    const total = this.options.totalFrames;
    const initialChunk = Math.min(this.options.initialChunkSize, total);

    // 1. Load initial chunk to start immediately
    const initialPromises: Promise<void>[] = [];
    for (let i = 0; i < initialChunk; i++) {
      initialPromises.push(this.loadSingleFrame(i));
    }

    await Promise.all(initialPromises);
    if (onProgress) {
      onProgress(this.loadedCount / total, this.loadedCount, total);
    }

    // 2. Load the remaining frames in background using batches
    const remainingIndices: number[] = [];
    for (let i = initialChunk; i < total; i++) {
      remainingIndices.push(i);
    }

    const batchSize = 6;
    const loadBatch = async (indices: number[]) => {
      const promises = indices.map((idx) =>
        this.loadSingleFrame(idx).then(() => {
          if (onProgress) {
            onProgress(this.loadedCount / total, this.loadedCount, total);
          }
        })
      );
      await Promise.all(promises);
    };

    // Process remaining in batches
    for (let i = 0; i < remainingIndices.length; i += batchSize) {
      const batch = remainingIndices.slice(i, i + batchSize);
      await loadBatch(batch);
    }
  }

  private loadSingleFrame(index: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.images[index]) {
        resolve();
        return;
      }

      const img = new Image();
      img.src = this.getFrameUrl(index);
      img.onload = () => {
        this.images[index] = img;
        this.loadedCount++;
        resolve();
      };
      img.onerror = () => {
        // Retry once on failure or fallback
        console.warn(`Failed to load frame ${index + 1}`);
        this.loadedCount++;
        resolve();
      };
    });
  }

  public getFrame(index: number): HTMLImageElement | null {
    const clampedIndex = Math.max(0, Math.min(index, this.options.totalFrames - 1));
    
    // If the exact frame isn't loaded yet, find closest loaded frame
    if (this.images[clampedIndex]) {
      return this.images[clampedIndex];
    }

    // Search nearest available frame (search backward first, then forward)
    for (let offset = 1; offset < this.options.totalFrames; offset++) {
      const prev = clampedIndex - offset;
      if (prev >= 0 && this.images[prev]) return this.images[prev];

      const next = clampedIndex + offset;
      if (next < this.options.totalFrames && this.images[next]) return this.images[next];
    }

    return null;
  }

  public render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    index: number
  ): void {
    const img = this.getFrame(index);
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#0a0b0e';
    ctx.fillRect(0, 0, width, height);

    if (!img) return;

    // Object-fit: cover calculation
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  public getTotalFrames(): number {
    return this.options.totalFrames;
  }
}
