const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");
const http= require("http");
const {Server}= require("socket.io");

connectDB();

const PORT = process.env.PORT || 5000;

// create HTTP Server
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin : "http://localhost:5173",
    credentials: true,
  },
});
app.set("io",io);

io.on("connection",(socket)=>{
  console.log("User Connected:",socket.id);

  socket.on("disconnect",()=>{
    console.log("User Disconnected:",socket.id);
  });
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});