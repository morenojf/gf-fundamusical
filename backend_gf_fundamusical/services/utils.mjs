// importacion de la "base de datos""
// Importo la base de datos desde el archivo example.json, y le digo que es un json para que no me tire error de tipo
// No se puede importar un json directamente, por eso lo importo con createRequire para usar commonjs dentro de un archivo mjs
import { createRequire } from 'node:module'

// CREACION FUNCION PARA LEER JSON
const require = createRequire(import.meta.url)

// EXPORTACION FUNCION PARA LEER JSON
export const readJSON = (path) => require(path)

export function monthConvertion(periodoMes) {

	const nombresMesesObjeto = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre"
};

const numeroMes = periodoMes;
const nombreMes = nombresMesesObjeto[numeroMes]
return nombreMes
}
