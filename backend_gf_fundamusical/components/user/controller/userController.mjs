import { SECRET_JWT_KEY } from '../../../configs/server.mjs'
import { userModel } from '../model/userModel.mjs'
import jwt from 'jsonwebtoken'

export class userController {
  static async validateUser(req, res) {
    const userInfo = req.body

    try {
      const validUser = await userModel.validateUser(userInfo)
      if (!validUser.length) {
        console.log('usuario no encontrado')
        res.status(401).send('Usuario o Contraseña incorrecto')
      } else {
        const token = jwt.sign(
          {
            userId: validUser[0].userId,
            nombreCoordinador: validUser[0].nombreCoordinador,
			cedulaCoordinador: validUser[0].cedulaCoordinador,
			nucleoId: validUser[0].nucleoId,
			telefonoCoordinador: validUser[0].telefonoCoordinador,
            userEmail: validUser[0].email,
            userPass: validUser[0].userPass,
            userRol: validUser[0].rol,
            isActive: validUser[0].isActive
          },
          SECRET_JWT_KEY,
          { expiresIn: '1h' }
        )
        res
          .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60
          })
          .status(202)
          .send({ validUser, token })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async validateSession(req, res) {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json({ valid: false })
    const data = jwt.verify(token, SECRET_JWT_KEY) // esta parte del codigo toma el token del navegador codificado y lo decofica para obtener los datos del usuario

    res.json({ valid: true, data })
  }

  static async getUsersList(req, res) {
    try {
      const usersList = await userModel.getAllUsers()
      res.status(200).send(usersList)
    } catch (error) {
      console.log(error)
    }
  }

  static async updateUser(req, res) {
    const userInfo = req.body
    try {
      const updatedUser = await userModel.updateUser(userInfo)
      res.status(200).send(updatedUser)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async deactivateUser(req, res) {
    const userInfo = req.body
    try {
      const inactiveUser = await userModel.deactivateUser(userInfo)
      res.status(200).send({ inactiveUser })
    } catch (error) {
      console.log(error)
    }
  }

  static async activateUser(req, res) {
    try {
      const userInfo = req.body
      const activatedUser = await userModel.activateUser(userInfo)
      res.status(200).send(activatedUser)
    } catch (error) {
      console.log(error)
    }
  }

  static async createUser(req, res) {
    try {
      const userInfo = req.body
      const createdUser = await userModel.createUser(userInfo)
      res.status(200).send(createdUser)
    } catch (error) {
      res.send(error)
	  console.log(error)
    }
  }

  static async logout(req, res) {
	res
	.clearCookie('access_token', {path:'/'})
	.json({message: 'Sesión cerrada correctamente'})
  }
}
