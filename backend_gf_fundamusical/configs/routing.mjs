import { Router } from 'express'
import { dashboardController } from '../components/dashboard/controller.mjs'
import { gestionController } from '../components/gestion/controller.mjs'
import { subcategoriaController } from '../components/subcategorias/controller/subcategoriasController.mjs'
import { planCuentaController } from '../components/planes_de_cuenta/controller/accController.mjs'
import { planInversionController } from '../components/plan_inversion/controller/planInversionController.mjs'
import { PIcontroller } from '../components/PI-design/PI-controller/PIcontroller.mjs'

export const routing = Router()

// Todas las rutas estan prescedidas por /api/

routing.get('/dashboard', dashboardController.getAll) // DASHBOARD
routing.get('/gestion/:id', gestionController.getAll) // VISTA GESTION

routing.post('/gestion-modal', planInversionController.createNewPI ) // CREAR NUEVO PLAN DE INVERSIÓN AL ABRIR MODAL {req.params.id} es necesario para pasar el user id. 
routing.get('/gestion-modal', planCuentaController.getAll) // MUESTRA PLANES DE CUENTA PARA DISEÑAR PLAN DE INVERSION


routing.get('/gestion/modal/plancuenta-subcategoria/:id', subcategoriaController.getById) // FILTRAR Y OBTENER SUBCATEGORIAS SEGUN EL PLAN DE CUENTA ID


routing.post('gestion/modal/plan-inversion', PIcontroller.createNewPI) // INTROUCIR VALORES DEL FORMULARIO MODAL PARA LLENAR planInversion_planCuenta / planInversion_subcategoria

