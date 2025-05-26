import { subcategoriaModel } from '../model/subcategoriaModel.mjs'

export class subcategoriaController {
	static async getById (req, res){
		const id = req.params.id
		const filteredCategory = await subcategoriaModel.getById(id)
		return res.status(200).json(filteredCategory)
	}
}
