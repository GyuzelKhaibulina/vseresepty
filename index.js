import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import accountRoutes from "./routes/account.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import multer from "multer";
import bodyParser from 'body-parser';
import { port } from './const/const.js';


const app = express();

 
const corsOptions ={
   origin: true, 
   credentials: true,           
   optionSuccessStatus: 200,
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   header: 'Access-Control-Allow-Origin',

}

// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

const router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json())




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});


app.get("/email", (req,res) =>  {
    res.send (`Requested from ${req.hostname} : <h>Hello</h1>`)
    }
)

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", postRoutes);
app.use("/api/account", accountRoutes);

app.listen(port, () => {
  console.log("Connected!", port);
});
 