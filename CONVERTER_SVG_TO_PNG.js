const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// -----------------------------
// تنظیمات
// -----------------------------

const INPUT_FOLDER = "./svg";
const OUTPUT_FOLDER = "./png";

// اندازه خروجی PNG
const WIDTH = 512;
const HEIGHT = 512;


// -----------------------------
// ساخت پوشه خروجی
// -----------------------------

if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}


// -----------------------------
// پیدا کردن SVG ها
// -----------------------------

const files = fs.readdirSync(INPUT_FOLDER);

const svgFiles = files.filter(file =>
    path.extname(file).toLowerCase() === ".svg"
);

console.log(`Found ${svgFiles.length} SVG files.`);


// -----------------------------
// تبدیل SVG → PNG
// -----------------------------

async function convertAll() {

    for (const file of svgFiles) {

        const inputPath = path.join(INPUT_FOLDER, file);

        const outputName =
            path.basename(file, path.extname(file)) + ".png";

        const outputPath =
            path.join(OUTPUT_FOLDER, outputName);

        try {

            await sharp(inputPath)
                .resize(WIDTH, HEIGHT)
                .png()
                .toFile(outputPath);

            console.log(`✓ ${file} → ${outputName}`);

        } catch (error) {

            console.error(`✗ Error converting ${file}`);
            console.error(error.message);

        }
    }

    console.log("\nConversion finished.");
}

convertAll();