// Ejemplo de cómo se vería 'datosFormulario' después de que el usuario interactúe:

export const datosFormulario = [
  {
    planInversionId: 1, // Siempre 1 en tu caso
    planCuentaId: 1,
    subcategoriasSeleccionadas: [1, 2, 3] // IDs de subcategorías
  },
  {
    planInversionId: 1,
    planCuentaId: 2,
    subcategoriasSeleccionadas: [4, 5, 6]
  },
  {
    planInversionId: 1,
    planCuentaId: 3,
    subcategoriasSeleccionadas: [] // Puede que no seleccione ninguna subcategoría
  }
]
