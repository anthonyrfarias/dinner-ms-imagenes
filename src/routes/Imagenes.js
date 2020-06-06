import express from "express";
import ImageController from "../controllers/ImageController";
import auth from "../middlewares/auth";
import multer from 'multer'



const upload = multer({
    dest: "/app/images",
    fieldSize: 10000000,
    fileSize: 10000000,
});
const route = express();

route.post("/saveImage", auth.verifyToken, upload.single('image'), ImageController.saveImage);
route.post("/saveImages", auth.verifyToken, upload.array('image', 10), ImageController.saveImages);
route.get("/getPrivate/:id", auth.verifyToken, ImageController.getPrivate);
route.get("/getImagesList", auth.verifyToken, ImageController.getImagesList);


// Metodos publicos

route.get("/getImage/:id", ImageController.getImage);


export default route;
