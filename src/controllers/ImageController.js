import * as fs from "fs";
import * as path from "path";
import token from "../services/token";
import models from "../models"
const pathToImages = "/app/images"

export default {
    getImage: async (req, res) => {
        try {
            const request = req.params
            if (!("id" in request) || request.id == "") {
                return res.status(200).send({
                    error: 1,
                    tag: "ID_REQUIRED",
                    message: "ID es requerido"
                });
            }
            const response = await models.ImageModel.findOne({ filename: request.id, publica: true });
            if (response) {
                const filename = response.filename
                fs.ReadStream(path.join(pathToImages, filename)).pipe(res);
            } else {
                return res.status(403).send({
                    error: 1,
                    tag: "NOT_FOUND_OR_UNAUTHORIZED",
                    message: "Está intentando acceder a una imagen que no es pública o que no existe"
                });
            }
        } catch (error) {
            return res.status(500).send({
                error: 1,
                tag: "ERROR",
                message: error
            });
        }

    },
    getImagesList: async (req, res) => {
        try {
            const options = {
                page: 1,
                limit: 50,
            };
            const filter = {}
            const resultToken = await token.decode(req.headers.token);
            if (("idEmpresa" in resultToken) || ("idEmpresa" in req.query)) {
                filter.empresa = resultToken.idEmpresa || req.query.idEmpresa
            }

            const response = await models.ImageModel.paginate(filter, options)
            return res.status(200).send({
                error: 0,
                tag: "SUCCESS",
                message: response
            });
        } catch (error) {
            return res.status(200).send({
                error: 1,
                tag: "ERROR",
                message: response
            });
        }
    },
    getPrivate: async (req, res) => {
        fs.ReadStream(path.join(pathToImages, "9885758df23e1a1feb768b569693f05a")).pipe(res);
    },
    saveImage: async (req, res) => {
        try {
            const request = req.body;
            const dataToken = await token.decode(req.headers.token);        
            if (!("descripcion" in request) || request.descripcion == "") {
                return res.status(200).send({
                    error: 1,
                    tag: "DESCRIPCION_REQUIRED",
                    message: "Descripción es obligatoria"
                });
            }
            
            if (!("publica" in request) || !stringToBoolean(request.publica)) {
                return res.status(200).send({
                    error: 1,
                    tag: "PUBLICA_REQUIRED",
                    message: "Debe indicar si la imagen es publica"
                });
            }
            if (!("file" in req)) {
                return res.status(200).send({
                    error: 1,
                    tag: "FILE_REQUIRED",
                    message: "Debe enviar un archivo"
                });
            }

            const imagen = {
                descripcion: request.descripcion,
                empresa: request.empresa ? request.empresa : null,
                usuario: dataToken._id,
                publica: request.publica,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                destination: req.file.destination,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
            }

            const response = await models.ImageModel.create(imagen)
            return res.status(200).send({
                error: 0,
                tag: "SUCCESS",
                message: response
            });
        } catch (error) {
            return res.status(500).send({
                error: 1,
                tag: "ERROR",
                message: error
            });
        }
    }, 
    saveImages: async (req, res) => {
        try {
            const request = req.files;
            const requestBody = req.body;
            if(!("files" in req) || (request).length == 0){
                return res.status(200).send({
                    error: 0,
                    tag: "NO_IMAGE_RECIEVED",
                    message: "Al menos una imagen es necesaria."
                });
            }

            const dataToken = await token.decode(req.headers.token); 
            
            for (let index = 0; index < request.length; index++) {
                
                const element = request[index];
                
                const imagen = {  
                    descripcion: "Descripción",                  
                    empresa: requestBody.idEmpresa ? requestBody.idEmpresa : null,
                    usuario: dataToken._id,
                    publica: 1,
                    originalname: element.originalname,
                    mimetype: element.mimetype,
                    destination: element.destination,
                    filename: element.filename,
                    path: element.path,
                    size: element.size,
                }
                const respuesta = await models.ImageModel.create(imagen)
                
            }

            

            return res.status(200).send({
                error: 0,
                tag: "SUCCESS",
                message: "Todas las imagenes han sido guardadas"
            });
        } catch (error) {
            return res.status(500).send({
                error: 1,
                tag: "ERROR",
                message: error
            });
        }
    }
}


const stringToBoolean = (string) => {
    switch (string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}