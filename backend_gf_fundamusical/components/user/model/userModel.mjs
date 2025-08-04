/* eslint-disable @typescript-eslint/no-unused-vars */
import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

export class userModel {
  static async validateUser(userInfo) {
    try {
      const foundUser = await connection.query(
        'SELECT * FROM user WHERE userPass = ? AND email = ?',
        [userInfo.userPass, userInfo.email]
      )
      return foundUser[0]
    } catch (error) {
      return error
    }
  }

  static async getAllUsers() {
    try {
      const [usersList] = await connection.query('SELECT * FROM user')
      return usersList
    } catch (error) {
      return error
    }
  }

  static async updateUser(userInfo) {
    const user = userInfo

    const updatedUser = await connection.query(
      'UPDATE user SET nucleoId = ?, nombreCoordinador = ?, cedulaCoordinador = ?, telefonoCoordinador = ?, email = ?, userPass = ? WHERE userId = ?',
      [
        parseInt(user.nucleoId),
        user.nombreCoordinador,
        user.cedulaCoordinador,
        user.telefonoCoordinador,
        user.email,
        user.userPass,
        user.userId
      ]
    )
    return [updatedUser]
  }

  static async deactivateUser(userInfo) {
    try {
      const user = userInfo
      const [inactiveUser] = await connection.query(
        'UPDATE user SET isActive = "Inactivo" WHERE userId = ?',
        [user.userId]
      )
      return inactiveUser
    } catch (error) {
      console.log(error)
    }
  }

  static async activateUser(userInfo) {
    try {
      const user = userInfo
      const [activatedUser] = await connection.query(
        'UPDATE user SET isActive = "Activo" WHERE userId = ?',
        [user.userId]
      )
      return activatedUser
    } catch (error) {
      console.log(error)
    }
  }

  static async createUser(userInfo) {
    // esta funcion debe hacer tres cosas.
    // 1 Crear un usuario en la tabla user
    // 2 Crear un nucleo en la tabla nucleo con el valor del id del usuario recien creado
    // 3 Crear la relacion nucleo_usuario con los valores ID del nucleo y el usuario recien creado

    const user = userInfo

    if (user.userRol === 'ADMIN') {
      const [createdUser] = await connection.query(
        'INSERT INTO `user` ( nombreCoordinador, cedulaCoordinador, telefonoCoordinador, email, userPass, rol) VALUES ( ?, ?, ?, ?, ?, ?)',
        [
          parseInt(user.nucleoId),
          user.nombreCoordinador,
          user.cedulaCoordinador,
          user.telefonoCoordinador,
          user.email,
          user.userPass,
          user.userRol
        ]
      )
      return createdUser
    } else {
      const [createdUser] = await connection.query(
        'INSERT INTO `user` (nucleoId, nombreCoordinador, cedulaCoordinador, telefonoCoordinador, email, userPass, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          user.nucleoId,
          user.nombreCoordinador,
          user.cedulaCoordinador,
          user.telefonoCoordinador,
          user.userEmail,
          user.userPassword,
          user.userRol
        ]
      )

      const relacionUsuarioNucleo = await connection.query(
        'INSERT INTO usuario_Nucleo (userId, nucleoId) VALUES (?, ?)',
        [createdUser.insertId, user.nucleoId]
      )
      return relacionUsuarioNucleo
    }
  }
}
