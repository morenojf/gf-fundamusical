import { Router } from 'express'
import { dashboardController } from '../components/dashboard/controller.mjs'
import { gestionController } from '../components/gestion/controller.mjs'
import { planInversionController } from '../components/plan_inversion/controller/planInversionController.mjs'
import { PIcontroller } from '../components/PI-design/PI-controller/PIcontroller.mjs'
import { solicitudController } from '../components/solicitudes/controller/solicitudesController.mjs'
import { articulosController } from '../components/articulos/controller/articulosController.mjs'
import { soporteController } from '../components/soportes/controller/soporteController.mjs'
import { upload } from '../middlewares/multerMiddleware.mjs'
import { periodoController } from '../components/periodos/controller/periodosController.mjs'
import { userController } from '../components/user/controller/userController.mjs'
import { recursosController } from '../components/recursos/recursosController/recursosController.mjs'
import { nucleoController } from '../components/nucleo/controller/nucleoController.mjs'
import { partidasController } from '../components/partidas/controller/partidasController.mjs'
import { operacionController } from '../components/operaciones/controller/operacionesController.mjs'

export const routing = Router()

// Todas las rutas estan prescedidas por /api/

routing.get('/dashboard/:id', dashboardController.getAll) // DASHBOARD segun UserID
routing.get('/gestion/:id', gestionController.getAll) // VISTA GESTION
routing.get('/nucleos-info', nucleoController.getAll) // Obtener la información de todos los núcleos sin condicion

routing.post('/gestion-modal', planInversionController.createNewPI) // CREAR PLAN DE INVERSIÓN AL ABRIR MODAL {req.params.id} es necesario para pasar el user id.

// OBTENER TODAS LAS PARTIDAS
routing.get('/get-partidas', partidasController.getAllPartidas)

// CREAR PERIODO
routing.post('/create-periodo', periodoController.createPeriodo)

// OBTENER PERIODOS
routing.get('/get-periodos', periodoController.getPeriodos)

// LLENAR TABLA periodo_partidas
routing.post('/attach-partidas-to-periodo', partidasController.relacionarPeriodoPartidas)

// OBTENER TODOS LOS DATOS TABLA periodo_partida
routing.get('/get-periodo_partidas-table', partidasController.getAllPeriodoPartidas)

// OBTENER TODAS LAS OPERACIONES 
routing.get('/get-all-operaciones', operacionController.getAllOperaciones)

// CREAR OPERACION
routing.post('/post-operacion',  upload.fields([
  { name: 'facturaRuta', maxCount: 1 },
  { name: 'soporteCartaRuta', maxCount: 1 }
]), operacionController.createOperacion)

// BORRAR OPERACION POR ID}
routing.delete('/delete-operacion/:id', operacionController.deleteOperacionById)

// ACTUALIZAR LOS BALANCES DE UN INGRESO O EGRESO UNA VEZ SE ELIMINA LA OPERACIÓN
routing.patch('/update-balance', operacionController.adjustBalance)


// -----------------------------------------------------------------
// OBTENER INFORMACIÓN DEL NUCLEO ASOCIADA AL USUARIO ID
routing.get('/nucleo-by-user-id/:id', nucleoController.getNucleoByUserId)


// ------------------------------------------------------------------
// CREAR PARTIDA
routing.post('/create-partida', partidasController.createPartida)

// -------------------------------------------------------------------
// ACTUALIZAR NOMBRE DE PARTIDA 
routing.patch('/update-partida', partidasController.updatePartida)

// ------------------------------------------------------------------
// ACTIVAR PARTIDA
routing.patch('/activate-partida', partidasController.activatePartida)


// ------------------------------------------------------------------
// DESACTIVAR PARTIDA
routing.patch('/deactivate-partida', partidasController.deactivatePartida)


// Llenar tabla planInversionPlanCuenta y planInversionSubcategoria
routing.post(
  '/gestion/modal/plan-inversion',
  PIcontroller.createNewPI
)

routing.get('/periodo-SolicitudesList/:id', solicitudController.getByPeriod) // OBTENER SOLICITUDES FILTRADAS POR PERIODO Y USUARIO


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
  { name: 'facturaRuta', maxCount: 1 },
  { name: 'soporteCartaRuta', maxCount: 1 }
]),
soporteController.addSoporte)
// CREAR EL SOPORTE DE LA SOLICITUD ESPECIFICA
// needs userId (JWT), solicitudId (req.params.id), URL googleDrive de la factura, URL googleDrive Cartas PyR, Monto, TIPO DE MONEDA 1 =BS 2 =USD (default 1)}

routing.get('/periodo/solicitud-soporte', soporteController.getSoporteInfo)
//OBTENER INFORMACION DE LOS SOPORTES


// OBTENER PERIODO INFO SEGUN PERIODO ID
routing.get('/periodo/:id', periodoController.getPeriodById)


// -----------------------------------------------------------------
// CREAR UN MOTIVO DE ANULACIÓN
routing.post('/periodo/solicitud-anular/:id', solicitudController.createMotivoAnulacion)
// needs solicitudId (req.params.id), motivoText (req.body.motivoAnulacion)

// CAMBIAR ESTADO DE SOLICITUD A ANULADO
routing.patch('/periodo/solicitud-statusChange/:id', solicitudController.changeStatus)

// OBTENER VALORES DE TABLA motivoAnulacion
routing.get('/periodo-anulaciones/solicitud-anular', solicitudController.getMotivosAnulacion)

// ---------------------------------------------------------------------------
// END POINT PARA LOGIN 

routing.post('/login', userController.validateUser) 
// en base a la informacion recibida por el front end, se valida que el pass y el username sea el mismo que la base de datos. 
// si sí entonces devolvemos true
// si no devolvemos, usuario no autorizado. 

// ---------------------------------------------------------------------------
// END POINT PARA VALIDAR SESION 
routing.get('/validate-session', userController.validateSession) 
// en base a la informacion recibida por el front end, se valida que el pass y el username sea el mismo que la base de datos. 
// se setea un token en el navegador

// ----------------------------------------------------------------------------
// END POINT PARA OBTENER TODOS LOS USUARIOS
routing.get('/get-all-users', userController.getUsersList)

// ---------------------------------------------------------------------------
// ACTUALIZAR INFORMACIÓN DE USUARIO
routing.patch('/change-user-info', userController.updateUser)


// ----------------------------------------------------------------------------
// DESACTIVAR UN USUARIO/NUCLEO
routing.patch('/deactivate-user', userController.deactivateUser)

// ----------------------------------------------------------------------------
// REACTIVAR UN USUARIO/NUCLEO
routing.patch('/activate-user', userController.activateUser)

// ----------------------------------------------------------------------------
// CREAR UN USUARIO/NUCLEO
routing.post('/create-user', userController.createUser)

// CREAR SOLO UN NUCLEO
routing.post('/create-nucleo', nucleoController.createNucleo)

//----------------------------------------------------------------------------
// ACTUALIZAR NOMBRE DE NUCLEO
routing.patch('/update-nucleo', nucleoController.updateNucleo)

//-----------------------------------------------------------------------------
// OBTENER LOS DATOS DE usuario_Nucleo tabla PARA PODER COMPARAR LOS NUCLEOS QUE YA TIENEN USUARIOS ASIGNADOS Y NO MOSTRARLOS 
routing.get('/get-nucleo-usuario', nucleoController.getNucleoUsuario)

// ----------------------------------------------------------------------------
// LogOut
routing.get('/log-out', userController.logout)


// ---------------------------------------------------------------------------
// END POINT PARA OBTENER RECURSOS DE public/modelosCartas
routing.get('/get-resources', recursosController.getResources)

