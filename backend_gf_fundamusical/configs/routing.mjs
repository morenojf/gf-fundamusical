import { Router } from 'express'
import { dashboardController } from '../components/dashboard/controller.mjs'
import { gestionController } from '../components/gestion/controller.mjs'
import { subcategoriaController } from '../components/subcategorias/controller/subcategoriasController.mjs'
import { planCuentaController } from '../components/planes_de_cuenta/controller/accController.mjs'
import { planInversionController } from '../components/plan_inversion/controller/planInversionController.mjs'
import { PIcontroller } from '../components/PI-design/PI-controller/PIcontroller.mjs'
import { solicitudController } from '../components/solicitudes/controller/solicitudesController.mjs'

import { datosFormulario } from '../services/mysql-db/PlanInversionDesignData.mjs'

import { datosSolicitud } from '../services/mysql-db/SolicitudDesignData.mjs'
const datosPI = datosFormulario
const solicitudData = datosSolicitud

export const routing = Router()

// Todas las rutas estan prescedidas por /api/

routing.get('/dashboard', dashboardController.getAll) // DASHBOARD
routing.get('/gestion/:id', gestionController.getAll) // VISTA GESTION

routing.post('/gestion-modal', planInversionController.createNewPI) // CREAR PLAN DE INVERSIÓN AL ABRIR MODAL {req.params.id} es necesario para pasar el user id.
routing.get('/gestion-modal', planCuentaController.getAll) // MUESTRA PLANES DE CUENTA PARA DISEÑAR PLAN DE INVERSION

routing.get('/gestion/modal/plancuenta-subcategoria/:id', subcategoriaController.getById) // FILTRAR Y OBTENER SUBCATEGORIAS SEGUN EL PLAN DE CUENTA ID

routing.post(
  '/gestion/modal/plan-inversion',
  (req, res, next) => {
    req.body = datosPI
    next()
  },
  PIcontroller.createNewPI
) // INTROUCIR VALORES DEL FORMULARIO MODAL PARA LLENAR planInversion_planCuenta / planInversion_subcategoria

routing.get('/periodo-SolicitudesList/:id', solicitudController.getByPeriod) // OBTENER SOLICITUDES FILTRADAS POR PERIODO Y USUARIO

// MOSTRAR PLANES DE CUENTAS DISPONIBLES SEGUN EL LOS SELECCIONADOS EN EL PI
routing.get('/periodo/solicitud', planCuentaController.getByPIPC)

routing.post('/periodo/solicitud-crearsolicitud', // CREAR UNA NUEVA SOLICITUD DENTRO DEL PERIODO
  (req, res, next) => {
    req.body = solicitudData
    next()
  }, solicitudController.createSolicitud)
// needs userId, periodId, planInversionplanCuentaId, Motivo
// periodoId obtenido dinámicamente al hacer una consulta la DB llamando al modelo periodo
