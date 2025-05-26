import { subcategoriaModel } from '../model/subcategoriaModel.mjs'

export class subcategoriaController {
  static async getById (req, res) {
    const id = req.params.id
    const filteredCategory = await subcategoriaModel.getById(id)
    if (!filteredCategory || filteredCategory.length === 0) {
      console.log('No se existen subcategorías para el plan de cuenta seleccionado')
      return res.status(404).json({ error: 'No se existen subcategorías para el plan de cuenta seleccionado' })
    }
    return res.status(200).json(filteredCategory)
  }
}
