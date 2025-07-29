import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class recursosController {
  static getResources(req, res) {
    const folderPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'modelosCartas'
    )
    console.log('Ruta de la carpeta de modelos de cartas:', folderPath)

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error al leer el directorio:', err)
        // Si la carpeta no existe o no se puede leer, devuelve un 500 o 404 si es un error de recurso
        res
          .status(500)
          .json({ error: 'No se pudo leer la carpeta de modelos de cartas.' })
      }

      // Filtrar solo archivos (opcional, pero buena práctica)
      const fileNames = files.filter((file) => {
        try {
          return fs.statSync(path.join(folderPath, file)).isFile()
        } catch (statErr) {
          console.warn(`No se pudo obtener el estado de ${file}:`, statErr)
          return false
        }
      })

      res.status(200).json({ files: fileNames })
    })
  }
}
