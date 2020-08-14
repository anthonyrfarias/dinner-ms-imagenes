import jwt from "jsonwebtoken";
const secret = "19bc65ca19bee2ce4d187ff0aa922397";
export default {
    decode: async token => {
        try {
            const decoded = jwt.verify(token, secret);
            if (!decoded) return false;
            return decoded;
        } catch (e) {
            return false;
        }
    }
};