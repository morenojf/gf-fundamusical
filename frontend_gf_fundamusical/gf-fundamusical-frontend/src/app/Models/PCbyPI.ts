import SubCategoria from "./subCategorias";

export default interface PCbyPI {
    Nombre: string,
    Plan_Id: number,
	PIPCid: number,
	subcategorias: SubCategoria[]
}