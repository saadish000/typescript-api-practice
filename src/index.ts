import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors({
    credentials : true
}));
app.use(compression());
app.use(cookieParser())
app.use(bodyParser.json());
app.use()

const server = http.createServer(app);

server.listen(8080,()=>{
console.log("Server is running on port 8080");
})

const MONGO_URL = "mongodb+srv://saadisheikh000:saad1234@cluster0.jvo02u9.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
console.log("connected");
mongoose.connection.on('error', (error:Error)=>{console.log(error)});