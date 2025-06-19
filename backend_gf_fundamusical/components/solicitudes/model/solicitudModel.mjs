import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class solicitudModel {
  static async getByUserId(UserId) {
    const [solicitudes] = await connectionDB.query(
      'SELECT * FROM solicitud WHERE userId = ?',
      [UserId]
    )
    return solicitudes
  }

  static async getByPeriod(userId, periodId) {
    const [solicitudes] = await connectionDB.query(
      'SELECT * FROM solicitud WHERE userId = ? AND periodoId = ?',
      [userId, periodId]
    )

    if (!solicitudes.length) {
      throw new Error('No existen solicitudes creadas')
    } else {
      return solicitudes
    }
  }

  static async addArticulos(solicitudList) {
    if (solicitudList.length === 0) {
      return null
    } else {
      const [comprobacionArticle] = await connectionDB.query(
        'SELECT * FROM articulo'
      )
      if (comprobacionArticle.length === 0) {
        console.log('NO HAY ARTICULOS EN LAS SOLICITUDES')
        return null
      } else {
        const solicitudes = solicitudList
        const updatedSolicitud = []

        // SEGUN LA CANTIDAD DE SOLICITUDES, OBTENEMOS LA SOLICITUD ACTUAL Y LOS ARTICULOS RELACIONADOS A ESA SOLICITUD
        for (let index = 0; index < solicitudes.length; index++) {
          const solicitudActual = solicitudes[index]

          const [ArticulosRelacionados] = await connectionDB.query(
            'SELECT articuloId FROM solicitud_Articulo WHERE solicitudId = ?',
            [solicitudActual.solicitudId]
          )

          const articulosSolicitud = []

          // SEGUN LA CANTIDAD DE ARTICULOS DE UNA SOLICITUD, OBTENEMOS EL ARTICULO UNO POR UNO Y SU NOMBRE
          for (let index = 0; index < ArticulosRelacionados.length; index++) {
            const articuloActual = ArticulosRelacionados[index]
            const [nombreArticulo] = await connectionDB.query(
              'SELECT articuloName FROM articulo WHERE articuloId = ?',
              [articuloActual.articuloId]
            )
            const [articuloCantidad] = await connectionDB.query(
              'SELECT cantidadSolicitada FROM solicitud_Articulo WHERE articuloId = ?',
              [articuloActual.articuloId]
            )
            articulosSolicitud.push({
              Articulo: articuloActual.articuloId,
              Nombre: nombreArticulo[0].articuloName,
              Cantidad: articuloCantidad[0].cantidadSolicitada
            })
          }

          updatedSolicitud.push({
            ...solicitudActual,
            articulosSolicitud: articulosSolicitud
          })
        }
        return updatedSolicitud
      }
    }
  }

  static async getQuantity(userId) {
    const [solicitudes] = await connectionDB.query(
      'SELECT * FROM solicitud WHERE userId = ?',
      [userId]
    )
    const cantidad = solicitudes.length
    return cantidad
  }

  static async getFinalizadas(userId) {
    const [solicitudesF] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 3 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesF.length
    return cantidad
  }

  static async getAnuladas(userId) {
    const [solicitudesA] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 2 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesA.length
    return cantidad
  }

  static async getActivas(userId) {
    const [solicitudesR] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 1 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesR.length
    return cantidad
  }

  static async changeStatus(solicitudId, newStatus) {
    const [statusChanged] = await connectionDB.query(
      'UPDATE solicitud SET solicitudStatus = ? WHERE solicitudId = ?',
      [newStatus, solicitudId]
    )
    console.log(
      'Estado de solicitudID: #',
      solicitudId,
      ' actualizado como: ',
      newStatus
    )
    return statusChanged
  }

  static async createSolicitud(solicitudData) {
    const userId = solicitudData.userId
    const periodoId = solicitudData.periodoId
    const PIPCid = solicitudData.solicitudPIPC
    const motivo = solicitudData.solicitudMotivo
    // const planCuentaName = PCname
    // const periodId = periodoId

    const createdSolicitudId = await connectionDB.query(
      'INSERT INTO solicitud (userId, periodoId, planInversionPlancuentaId, solicitudMotivo) VALUES (?, ?, ?, ?)',
      [userId, periodoId, PIPCid, motivo]
    )

    return createdSolicitudId[0].insertId
  }

  static async createMotivoAnulacion(solicitudId, motivoText) {
    try {
      await connectionDB.query(
        'INSERT INTO motivoAnulacion (solicitudId, motivoText) VALUES (?, ?)',
        [solicitudId, motivoText]
      )
      return true
    } catch (error) {
      console.log('error al crear el motivo de anulacion', error)
    }
  }

  static async getMotivosAnulacion() {
    const [motivosAnulacion] = await connectionDB.query(
      'SELECT * FROM motivoAnulacion'
    )
    if (!motivosAnulacion.length) {
      throw new Error('No existe motivos de anulacion para mostrar')
    } else {
      return motivosAnulacion
    }
  }
}
