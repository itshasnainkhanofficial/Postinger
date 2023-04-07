import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './server/routers/auth.js'
import postRoutes from './server/routers/post.js'
import ConnectDB from './server/config/db.js'
import errorHandler from './server/midddleware/errorhandler.js'

// **********  for production
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// **********  for production


dotenv.config()
ConnectDB()


// Variable initilization
const app = express()
const PORT = process.env.PORT || 3000


// Middleware
app.use(express.json()) // body parser for post request except html post form
app.use(express.urlencoded({extended: false}))  //body parser for html post form
app.use(cors())




// routes
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)


// // Serve frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, './client/dist')));
  
//     app.get('*', (req, res) =>
//       res.sendFile(
//         path.resolve(__dirname, './', 'client', 'dist', 'index.html')
//       )
//     );
//   } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
//   }

// error handler
app.use(errorHandler) // this will override express default error handler which is throw new Error("some error")






// // Without saperating router file use the below
// app.get('/', (req, res) => {
//   res.status(200).json({message: "working properly"})
// })



// // starting express server without need of mongodb
app.listen(PORT, () => console.log(`Server Connect on Port: ${PORT}`))







// if we want to use mongoose and experess server on same file
// mongoose.connect(process.env.MONGO_URI, {

//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// }).then( () => { 


//     app.listen(PORT, () => console.log(`Server Connect on Port: ${PORT}`))

// }).catch( (error) => console.log(`Mongodb Did not connect here is the message: ${error}`))



