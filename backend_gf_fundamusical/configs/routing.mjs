import { Router } from 'express'
import { dashboardController } from '../components/dashboard/controller.mjs'
import { gestionController } from '../components/gestion/controller.mjs'
import { subcategoriaController } from '../components/subcategorias/controller/subcategoriasController.mjs'
import { planCuentaController } from '../components/planes_de_cuenta/controller/accController.mjs'
import { planInversionController } from '../components/plan_inversion/controller/planInversionController.mjs'
import { PIcontroller } from '../components/PI-design/PI-controller/PIcontroller.mjs'
import { solicitudController } from '../components/solicitudes/controller/solicitudesController.mjs'
import { articulosController } from '../components/articulos/controller/articulosController.mjs'
import { soporteController } from '../components/soportes/controller/soporteController.mjs'


import { datosArticulos } from '../services/mysql-db/articlesDesignData.mjs' // DATOS CREAR ARTICULO
import { datosSolicitud } from '../services/mysql-db/SolicitudDesignData.mjs' // DATOS DISEniO SOLICITUD
const solicitudData = datosSolicitud
const datosArticles = datosArticulos

export const routing = Router()

// Todas las rutas estan prescedidas por /api/

routing.get('/dashboard', dashboardController.getAll) // DASHBOARD
routing.get('/gestion/:id', gestionController.getAll) // VISTA GESTION

routing.post('/gestion-modal', planInversionController.createNewPI) // CREAR PLAN DE INVERSIÓN AL ABRIR MODAL {req.params.id} es necesario para pasar el user id.
routing.get('/gestion-modal', planCuentaController.getAll) // MUESTRA PLANES DE CUENTA PARA DISEniAR PLAN DE INVERSION

routing.get(
  '/gestion/modal/plancuenta-subcategoria/:id',
  subcategoriaController.getById
) // FILTRAR Y OBTENER SUBCATEGORIAS SEGUN EL PLAN DE CUENTA ID

routing.post(
  '/gestion/modal/plan-inversion',
  PIcontroller.createNewPI
) // INTROUCIR VALORES DEL FORMULARIO MODAL PARA LLENAR planInversion_planCuenta / planInversion_subcategoria

routing.get('/periodo-SolicitudesList/:id', solicitudController.getByPeriod) // OBTENER SOLICITUDES FILTRADAS POR PERIODO Y USUARIO

// MOSTRAR PLANES DE CUENTAS DISPONIBLES SEGUN EL LOS SELECCIONADOS EN EL PI
routing.get('/periodo/solicitud', planCuentaController.getByPIPC)

routing.post(
  '/periodo/solicitud-crearsolicitud', // CREAR UNA NUEVA SOLICITUD DENTRO DEL PERIODO
  (req, res, next) => {
    req.body = solicitudData
    next()
  },
  solicitudController.createSolicitud
)
// needs userId, periodId, planInversionplanCuentaId, Motivo
// periodoId obtenido dinámicamente al hacer una consulta la DB llamando al modelo periodo

routing.post(
  '/periodo/solicitud-addArticle/:id',
  (req, res, next) => {
    req.body = datosArticles
    next()
  },
  articulosController.addToSolicitud
)
// EL ObjectArray ENVIADO DE FRONT TIENE ArticuloName PARA LA TABLA articulo
// y cantidadSolicitada PARA LA TABLA solicitud_Articulo

// 1.- DE LOS ARTICULOS ENVIADOS SE CREAN EN LA TABLA
// 2.- SE TOMA EL ID DE LOS ARTICULOS ENVIADOS
// 3.- SE COLOCAN EN LA TABLA INTERMEDIA SOLICITUD ARTICULO PARA RELACIONAR LOS ARTICULOS CON LA SOLICITUD EN ESPECIFICO

routing.post('/periodo/solicitud-soporte/:id', soporteController.addSoporte)
// CREAR EL SOPORTE DE LA SOLICITUD ESPECIFICA
// needs userId (JWT), solicitudId (req.params.id), URL googleDrive de la factura, URL googleDrive Cartas PyR, Monto, TIPO DE MONEDA 1 =BS 2 =USD (default 1)}

routing.get('/periodo/solicitud-soporte/:id', soporteController.getSoporteInfo)
//OBTENER INFORMACION DEL SOPORTE SEGÚN LA SOLICITUD ESPECIFICA