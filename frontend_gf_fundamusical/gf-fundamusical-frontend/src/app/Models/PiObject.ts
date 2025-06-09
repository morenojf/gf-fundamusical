export default interface PiObject {
	planInversionId: number, // SEGUN EL PLAN DE INVERSION SELECCIONADO
    planCuentaId: number, // ID DE PC SEGUN LOS PC SELECCIONADOS QUE VIENEN DE LA PETICION
    subcategoriasSeleccionadas: number[] // ID DE SC SEGUN LAS SC SELECCIONADOS QUE VIENEN DE LA PETICION EN BASE A LOS ID DE PI SELECCIONADO
}