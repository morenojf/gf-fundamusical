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
import { upload } from '../middlewares/multerMiddleware.mjs'
import { periodoController } from '../components/periodos/controller/periodosController.mjs'

export const routing = Router()

// Todas las rutas estan prescedidas por /api/

routing.get('/dashboard/:id', dashboardController.getAll) // DASHBOARD
routing.get('/gestion/:id', gestionController.getAll) // VISTA GESTION

routing.post('/gestion-modal', planInversionController.createNewPI) // CREAR PLAN DE INVERSIÓN AL ABRIR MODAL {req.params.id} es necesario para pasar el user id.
routing.get('/gestion-modal', planCuentaController.getAll) // MUESTRA PLANES DE CUENTA PARA DISEniAR PLAN DE INVERSION


// OBTENER SOLICITUDES SEGUN USER ID
routing.get('/dashboard/user-solicitudes/:id', solicitudController.getByUserId)

routing.get(
  '/gestion/modal/plancuenta-subcategoria/:id',
  subcategoriaController.getById
) // FILTRAR Y OBTENER SUBCATEGORIAS SEGUN EL PLAN DE CUENTA ID



// Llenar tabla planInversionPlanCuenta y planInversionSubcategoria
routing.post(
  '/gestion/modal/plan-inversion',
  PIcontroller.createNewPI
)

routing.get('/periodo-SolicitudesList/:id', solicitudController.getByPeriod) // OBTENER SOLICITUDES FILTRADAS POR PERIODO Y USUARIO



// MOSTRAR PLANES DE CUENTAS DISPONIBLES SEGUN PI
routing.get('/periodo/solicitud/:id', planCuentaController.getByPIPC)



// CREAR UNA NUEVA SOLICITUD DENTRO DEL PERIODO
routing.post('/periodo/solicitud-crearsolicitud', solicitudController.createSolicitud)
// needs userId, periodId, planInversionplanCuentaId, Motivo
// periodoId obtenido dinámicamente al hacer una consulta la DB llamando al modelo periodo



routing.post('/periodo/solicitud-addArticle/:id', articulosController.addToSolicitud)
// EL ObjectArray ENVIADO DE FRONT TIENE ArticuloName PARA LA TABLA articulo
// y cantidadSolicitada PARA LA TABLA solicitud_Articulo

// 1.- DE LOS ARTICULOS ENVIADOS SE CREAN EN LA TABLA
// 2.- SE TOMA EL ID DE LOS ARTICULOS ENVIADOS
// 3.- SE COLOCAN EN LA TABLA INTERMEDIA SOLICITUD ARTICULO PARA RELACIONAR LOS ARTICULOS CON LA SOLICITUD EN ESPECIFICO



// IMPORTANTE, ESTO DA ERROR CUANDO LOS DOS ARCHIVOS SON CREADOS EXACTAMENTE AL MISMO TIEMPO POR LO QUE EL NOMBRE ES IGUAL Y DA ERROR.
routing.post('/periodo/solicitud-soporte/:id', upload.fields([
  { name: 'rutaFactura', maxCount: 1 },
  { name: 'rutaCartaPyR', maxCount: 1 }
]),
soporteController.addSoporte)
// CREAR EL SOPORTE DE LA SOLICITUD ESPECIFICA
// needs userId (JWT), solicitudId (req.params.id), URL googleDrive de la factura, URL googleDrive Cartas PyR, Monto, TIPO DE MONEDA 1 =BS 2 =USD (default 1)}

routing.get('/periodo/solicitud-soporte', soporteController.getSoporteInfo)
//OBTENER INFORMACION DE LOS SOPORTES


// Metodos especiales: ---------------------------------------------
// OBTENER UN PC SEGUN EL PIPC
routing.get('/periodo/solicitud-pc/:id', planCuentaController.getPCnameByPIPC)

// OBTENER PERIODO INFO SEGUN PERIODO ID
routing.get('/periodo/:id', periodoController.getPeriodById)

// OBTENER TABLA 


// -----------------------------------------------------------------
// CREAR UN MOTIVO DE ANULACIÓN
routing.post('/periodo/solicitud-anular/:id', solicitudController.createMotivoAnulacion)
// needs solicitudId (req.params.id), motivoText (req.body.motivoAnulacion)

// CAMBIAR ESTADO DE SOLICITUD A ANULADO
routing.patch('/periodo/solicitud-statusChange/:id', solicitudController.changeStatus)

// OBTENER VALORES DE TABLA motivoAnulacion
routing.get('/periodo-anulaciones/solicitud-anular', solicitudController.getMotivosAnulacion)
