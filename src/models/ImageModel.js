import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ImageSchema = new Schema({
    descripcion: { type: String, maxlength: 255, required: true },    
    empresa: { type: Schema.ObjectId, default: null },
    usuario: { type: Schema.ObjectId, default: null },
    publica: { type: Boolean, default: false },
    // tipoImagen: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

ImageSchema.plugin(mongoosePaginate);
const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;