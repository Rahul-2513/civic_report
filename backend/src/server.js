const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");
const http= require("http");
const {Server}= require("socket.io");

connectDB();

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /\.vercel\.app$/.test(new URL(origin).hostname);
};

// create HTTP Server
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin(origin, callback) {
      try {
        if (isAllowedOrigin(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS not allowed"));
      } catch (error) {
        return callback(new Error("Invalid origin"));
      }
    },
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
