import { Injectable } from '@angular/core';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


@Injectable({
    providedIn: 'root'
})
export default class FFmpegService {

    private isReady = false;
    public isRunning = false;
    private ffmpeg = createFFmpeg({ log: true });

    public async initialize(): Promise<boolean> {
        if (this.isReady) {
            return true;
        }

        await this.ffmpeg.load();
        this.isReady = true;

        return true;
    }

    public async getScreenshots(file: File): Promise<string[]> {
        this.isRunning = true;

        const fileData = await fetchFile(file);
        this.ffmpeg.FS('writeFile', file.name, fileData);

        const seconds: number[] = [ 1, 5, 10 ];
        const commands: string[] = [];

        seconds.forEach((second, ind) => {
            commands.push(
                '-i', file.name,
                '-ss', `00:00:${ second.toString().padStart(2, '0') }`,
                '-frames:v', '1',
                '-filter:v', 'scale=510:-1',
                `output_0${ind + 1}.png`
            );
        });

        await this.ffmpeg.run(...commands);

        const screenshots: string[] = seconds.map((_, ind) => {
            const screenshotFile = this.ffmpeg.FS('readFile', `output_0${ind + 1}.png`);
            const screenshotBlob = new Blob([ screenshotFile.buffer ], { type: 'image/png' });
            return URL.createObjectURL(screenshotBlob);
        });
        this.isRunning = false;

        return screenshots;
    }

    public async getBlobFromUrl(url: string): Promise<Blob> {
        const response = await fetch(url);
        return await response.blob();
    }

}
