import multer from "multer"


// Esto es la "Configuracion" de Multer
	const storage = multer.diskStorage(
		{
			// Le asigna un nuevo nombre al archivo recibido para evitar duplicados
			filename: function(req, file, cb){

				const ext = file.originalname.split('.').pop() 
				// Split divide por puntos y pop toma la ultima division
				// asi obtenemos la extension del archivo

				const filename = Date.now()
				// Asigna el nombre del archivo segun la fecha y hora actual

				cb(null, `${filename}.${ext}`)
				// esta funcion call back tiene dos parametros a retornar (err, res)
				// la respuesta va a ser NombreArchivo . extension
			},
			destination: function(req, file, cb){
				cb(null, 'C:/Users/fjmor/OneDrive/Documentos/Francisco/Universidad/TAREAS/10mo semestre/TRABAJO/APIREST GESTION FINANCIERA FUNDAMUSICAL/backend_gf_fundamusical/public/supports')
			}
		}
	)

	export const upload = multer({ storage });