const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
 cors: {
    origin: "*",
  }
});
io.on("connection", (socket) => {
  socket.on("active-user", (data) => {
    addUser({ id: socket.id, _id: data._id });
    socket._id = data._id;
  });
  socket.on('accept', data => {
    const {id, userId} = data
    
  })
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected");
  });
});
// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTypeRoutes");
const jobRoute = require("./routes/jobsRoutes");
const roleRoute = require("./routes/roleRoutes")
const companyRoute = require("./routes/companyRoutes")

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const { addUser, removeUser } = require("./data/user");
const DB = process.env.DATABASE
//database connection
mongoose
  .connect(
    DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobTypeRoute);
app.use("/api", jobRoute);
app.use("/api", roleRoute);
app.use("/api", companyRoute);

__dirname = path.resolve();


app.get("/", (req, res) => {
  res.send("API is running....");
});
// }

// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000;
console.log(process.env.PORT)

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
