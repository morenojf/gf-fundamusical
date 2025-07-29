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
      for (let index = 0; index < usersList.length; index++) {
        let user = usersList[index]
        const [userNucleo] = await connection.query(
          'SELECT nucleoName FROM nucleo WHERE userId = ?',
          [user.userId]
        )

        usersList[index] = {
          ...user,
          userNucleo: userNucleo[0]?.nucleoName || null
        }
      }
      return usersList
    } catch (error) {
      return error
    }
  }

  static async updateUser(userInfo) {
    const user = userInfo
    try {
      const updatedUser = await connection.query(
        'UPDATE user SET userName = ?, email = ?, userPass = ? WHERE userId = ?',
        [user.userName, user.email, user.userPass, user.userId]
      )
      return [updatedUser]
    } catch (error) {
      let errorMssg = error.sqlMessage
      return errorMssg
    }
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

    try {
      const user = userInfo

      if (user.userRol === 'ADMIN') {
        const [createdUser] = await connection.query(
          'INSERT INTO `user` (userName, email, userPass, rol) VALUES (?, ?, ?, ?)',
          [user.userName, user.userEmail, user.userPassword, user.userRol]
        )
        return
      } else {
        const [createdUser] = await connection.query(
          'INSERT INTO `user` (userName, email, userPass, rol) VALUES (?, ?, ?, ?)',
          [user.userName, user.userEmail, user.userPassword, user.userRol]
        )

        const [createdNucleo] = await connection.query(
          'INSERT INTO nucleo (userId, nucleoName, nucleoCoordinador, nucleoDirector) VALUES (?, ?, ?, ?)',
          [
            createdUser.insertId,
            user.nucleoName,
            user.coordinadorName,
            user.directorName
          ]
        )

        const relacionUsuarioNucleo = await connection.query(
          'INSERT INTO usuario_Nucleo (userId, nucleoId) VALUES (?, ?)',
          [createdUser.insertId, createdNucleo.insertId]
        )
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
}
