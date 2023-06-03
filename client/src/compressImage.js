const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");

async function compressImage(inputPath, outputPath) {
    await imagemin([inputPath], {
      destination: outputPath,
      plugins: [
        imageminPngquant(),
        imageminJpegtran(),
        imageminGifsicle(),
        imageminSvgo(),
      ],
    });
  }