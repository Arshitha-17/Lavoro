import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000
import userRoutes from "./routes/userRoutes.js"
import hrRoutes from "./routes/hrRoutes.js"
import adminRoutes from './routes/adminRoutes.js'


connectDB()

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('backend/public'));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/users', userRoutes)
app.use('/api/hr', hrRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)

const server = app.listen(port, () => console.log(`server start port ${port}`))


import { Server } from 'socket.io'

const io = new Server(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on("connection", (socket) => {
  console.log("connected with socket io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined room:" + room);
  })

  socket.on('new message', (newMessageReceived) => {
    console.log("newMessagesss");
    console.log(newMessageReceived);
    var chat = newMessageReceived.room;
    console.log("its me chatssssss");
    console.log(chat);

    if ( !chat.user || !chat.hr) {
      return console.log('Chat or chat.user or chat.hr not defined');
    }

    if (chat.user._id === newMessageReceived.sender._id) {
      socket.to(chat.hr._id).emit("message received", newMessageReceived);
    }
    if(chat.hr._id === newMessageReceived.sender._id){
      socket.to(chat.user._id).emit("message received",newMessageReceived)
    }
  })
});
