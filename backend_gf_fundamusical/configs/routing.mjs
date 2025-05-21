import http from 'http'

const PORT = 3128 // Puerto en el que se va a escuchar el servidor, si es 0 se elige uno aleatorio

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8') // El header Content-Type indica que el contenido es texto plano y que se usará la codificación UTF-8

  if (req.url === '/') {
    console.log('Request received:')
    res.end('este es el sin nada')
  } else if (req.url === '/segundotry') {
    console.log('Request received:')
    res.end('este es el segundo')
  } else {
    res.statusCode = 404 // Not Found
    console.log('Request received:')
    res.end('not found')
  }
})
