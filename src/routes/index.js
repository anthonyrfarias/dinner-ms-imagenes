import express from "express";
import Imagenes from "./Imagenes"

const route = express();
route.use("/image", Imagenes);


export default route;