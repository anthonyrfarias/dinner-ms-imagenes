import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import path from "path";
import cors from "cors";

const dbUrl = process.env.MONGO_URL || "mongodb://172.17.0.1:27020/delivery-app-imagenes";
mongoose.Promise = global.Promise;
mongoose
    .connect(dbUrl, { useCreateIndex: true })
    .then(mongoose =>
        console.log("Conectado a base de datos de microservicio de imagenes")
    )
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);


app.get("/", (req, res, next) => {
    res.send("Bienvenido al microservicio imagenes de DINNER.");
});


app.listen(6063, () => {
    console.log("Microservicio Imagenes Corriendo");
});