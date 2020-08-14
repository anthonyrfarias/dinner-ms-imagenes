import express from "express";
import ImageController from "../controllers/ImageController";
import authMid from "../middlewares/auth";
import multer from 'multer'



const upload = multer({
    dest: "/app/images",
    fieldSize: 10000000,
    fileSize: 10000000,
});
const route = express();

route.post("/saveImage", authMid.verifyToken, upload.single('image'), ImageController.saveImage);
route.post("/saveImages",  authMid.verifyToken, upload.array('image', 10), ImageController.saveImages);
route.get("/getPrivate/:id", authMid.verifyToken, ImageController.getPrivate);
route.get("/getImagesList", authMid.verifyToken, ImageController.getImagesList);


// Metodos publicos

route.get("/getImage/:id", ImageController.getImage);
route.get("/getImage/:id/b64", ImageController.getImageB64);


export default route;
