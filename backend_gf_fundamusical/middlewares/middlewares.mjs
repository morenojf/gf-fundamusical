// ESTO NO ESTA FUNCIONANDO, NO ESTA PERMITIENDO EL ACCESO CUANDO SE IMPLEMENTA

// import cors from 'cors'

// const ACCEPTED_ORIGINS = [
//   '*'
// ]

// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
//   origin: (origin, callback) => {
//     if (acceptedOrigins.includes(origin)) {
//       return callback(null, true)
//     }

//     if (!origin) {
//       return callback(null, true)
//     }

//     return callback(new Error('Not allowed by CORS'))
//   }
// })
