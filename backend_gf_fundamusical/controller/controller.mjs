// este archivo recibira la ruta y seleccionara el modelo correspondiente.
// en caso de fallo, lanza el error res.srtatus(httpStatus)
// En caso de succeso, devuelve el resultado.

import { model } from '../model/localdb.mjs'

app.get('/', (req, res) => {
  res.send('<h1>Esta es la pagina principal</h1>').status(200) // Express automáticamente establece el Content-Type
})

app.get('/lepiculas', (req, res) => {
  const { genre } = req.query
  if (genre) {
	const filteredMovies = movies.filter(
	  movie => movie.Genre.includes(genre))
	return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/lepiculas/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.imdbID === id)
  if (movie) return res.json(movie.Title) // Express automáticamente establece el Content-Type

  res.status(404).send('Not Found | Error 404') // Si no se encuentra la pelicula, se devuelve un error 404
})

app.use((req, res) => {
  res.status(404).send('Not Found | Error 404')
})
