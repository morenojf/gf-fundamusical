// Load our library that generates the document
import Docxtemplater from 'docxtemplater'
// Load PizZip library to load the docx/pptx/xlsx file in memory
import PizZip from 'pizzip'

// Builtin file system utilities
import fs from 'fs'
import path from 'path'

// Define __dirname for ES modules
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// output filename
let fileName = Date.now()

// Load the docx file as binary content
const content = fs.readFileSync(
  path.resolve(__dirname, 'PlanInversion.docx'),
  'binary'
)

// Unzip the content of the file
const zip = new PizZip(content)

/*
 * Parse the template.
 * This function throws an error if the template is invalid,
 * for example, if the template is "Hello {user" (missing closing tag)
 */
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true
})

/*
 * Render the document : Replaces :
 * - {first_name} with John
 * - {last_name} with Doe,
 * ...
 */


// IMPORTANTE SEA UN OBJETO SOLO O UN ARRAY SIEMPRE SE DEBE ACCEDER COMO ARRAY 
doc.render({
  dashboard: {
    nucleoName: 'Nucleo Caracas Centro'.toUpperCase(),
    nucleoCoordinador: 'Ana Rivas',
    nucleoDirector: 'Pedro Torres',
    totalSolicitudes: 3,
    totalFinalizadas: 2,
    totalAnuladas: 1,
    totalActivas: 0
  },

  dataPlanesCuenta: [
    {
      Nombre: 'Infraestructura'.toUpperCase(),
      Plan_Id: 1,
      PIPCid: 1,
      subcategorias: [
        {
          subcategoriaId: 1,
          subcategoriaName: 'Infraestructura de Transporte'
        },
        {
          subcategoriaId: 2,
          subcategoriaName: 'Infraestructura Energética'
        },
        {
          subcategoriaId: 3,
          subcategoriaName: 'Infraestructura Hídrica y de Saneamiento'
        },
        {
          subcategoriaId: 4,
          subcategoriaName: 'Infraestructura de Comunicaciones'
        }
      ]
    },
    {
      Nombre: 'Material de Enseñanza'.toUpperCase(),
      Plan_Id: 3,
      PIPCid: 2,
      subcategorias: []
    },
    {
      Nombre: 'Materiales y Útiles de Limpieza y Aseo'.toUpperCase(),
      Plan_Id: 4,
      PIPCid: 3,
      subcategorias: [
        {
          subcategoriaId: 17,
          subcategoriaName: 'Herramientas y Utensilios Manuales de Limpieza'
        },
        {
          subcategoriaId: 20,
          subcategoriaName: 'Accesorios y Consumibles de Apoyo'
        }
      ]
    },
    {
      Nombre: 'Mantenimiento y Reparación'.toUpperCase(),
      Plan_Id: 5,
      PIPCid: 4,
      subcategorias: []
    }
  ]
})

/*
 * Get the output document and export it as a Node.js buffer
 * This method is available since docxtemplater@3.62.0
 */
const buf = doc.toBuffer()

// Write the Buffer to a file
fs.writeFileSync(path.resolve(__dirname, `OUTPUT_${fileName}.docx`), buf)
/*
 * Instead of writing it to a file, you could also
 * let the user download it, store it in a database,
 * on AWS S3, ...
 */
