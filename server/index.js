import express  from "express"
import {Server} from "socket.io"
import path from 'path'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500;

const app=express()

app.use(express.static(path.join(__dirname,'public')));

const expressServer = app.listen(PORT,()=> {
    console.log(`listening on port 3500`)})



const io =new Server(expressServer,{
    cors:process.env.NODE_ENV === "production" ? false : ["http://localhost:5500","http://127.0.0.1:localhost:5500"]
})

io.on('connection',socket=>{
    console.log(`user ${socket.id} connected`)

    socket.on('message',data=>{
        console.log(data)
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    })
})

