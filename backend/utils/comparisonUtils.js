const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const pixelmatch = require('pixelmatch');
const tesseract = require('tesseract.js');
const jsdiff = require('diff');

// Compare Text
function compareText(oldText, newText, options = { format: 'plain' }) {
    const diff = jsdiff.diffWords(oldText, newText);
    if (options.format === 'plain') {
        return diff.map((part) => ({
            value: part.value,
            added: part.added || false,
            removed: part.removed || false,
        }));
    } else if (options.format === 'rich') {
        return diff.map((part) => ({
            value: part.value,
            added: part.added ? `<span style="color: green;">${part.value}</span>` : '',
            removed: part.removed ? `<span style="color: red;">${part.value}</span>` : '',
        }));
    } else if (options.format === 'redline') {
        return diff.map((part) => ({
            value: part.value,
            added: part.added ? `+${part.value}` : '',
            removed: part.removed ? `-${part.value}` : '',
        }));
    }
}

// Compare Images
async function compareImages(oldImagePath, newImagePath) {
    const img1 = await loadImage(oldImagePath);
    const img2 = await loadImage(newImagePath);

    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.drawImage(img1, 0, 0);
    const img1Data = context.getImageData(0, 0, width, height);

    context.clearRect(0, 0, width, height);
    context.drawImage(img2, 0, 0);
    const img2Data = context.getImageData(0, 0, width, height);

    const diffCanvas = createCanvas(width, height);
    const diffContext = diffCanvas.getContext('2d');
    const diffData = diffContext.createImageData(width, height);

    const diffPixels = pixelmatch(
        img1Data.data,
        img2Data.data,
        diffData.data,
        width,
        height,
        { threshold: 0.1 }
    );

    diffContext.putImageData(diffData, 0, 0);
    const diffImagePath = 'uploads/diff.png';
    fs.writeFileSync(diffImagePath, diffCanvas.toBuffer('image/png'));

    return { diffPixels, diffImagePath };
}

// Extract OCR Text
async function extractOCRText(imagePath) {
    const result = await tesseract.recognize(imagePath);
    return result.data.text;
}

module.exports = { compareText, compareImages, extractOCRText };