const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const svgPath = path.join(__dirname, '../public/icons/icon.svg')
const outputDir = path.join(__dirname, '../public/icons')

// Leer el SVG
const svgBuffer = fs.readFileSync(svgPath)

// Generar iconos para cada tamaño
async function generateIcons() {
  for (const size of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
      
      console.log(`✅ Generado icon-${size}x${size}.png`)
    } catch (error) {
      console.error(`❌ Error generando icon-${size}x${size}.png:`, error)
    }
  }
  
  console.log('🎉 Todos los iconos generados exitosamente!')
}

generateIcons()
