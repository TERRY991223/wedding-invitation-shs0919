import { glob } from 'glob';
import imageSize from 'image-size';
import type { PageServerLoad } from './$types';
import * as fs from 'fs/promises';

export const load: PageServerLoad = async () => {
    let imagePaths = await glob('static/personal-assets/gallery_*.webp');

    // Sort image paths numerically based on the number in the filename
    imagePaths.sort((a, b) => {
        const numA = parseInt(a.match(/gallery_(\d+)\.webp$/)?.[1] || '0');
        const numB = parseInt(b.match(/gallery_(\d+)\.webp$/)?.[1] || '0');
        return numA - numB;
    });

    const photos = await Promise.all(
        imagePaths.map(async (path) => {
            const buffer = await fs.readFile(path);
            const dimensions = imageSize(buffer);
            const isPortrait = (dimensions.height ?? 0) > (dimensions.width ?? 0);
            return {
                src: path.replace('static', ''),
                width: isPortrait ? 1200 : 2000,
                height: isPortrait ? 1800 : 1333,
            };
        })
    );

    return {
        photos,
    };
};
