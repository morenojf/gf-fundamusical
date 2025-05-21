import { Router } from 'express' // nativo de express permite crear rutas
import { controller } from '../controller/controller.mjs' // importo el controlador desde el archivo controller.mjs

export const routing = Router()

routing.get('/', controller.getAll)
routing.post('/', controller.creat)

routing.get('/:id', controller.getById)
routing.delete('/:id', controller.delete)
routing.patch('/:id', controller.update) // actualizar un W parcialmente
 
const test = 1