import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MAX_SIZE = 3; // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MULTER = {
  storage: multer.diskStorage({
    //manipula o armazenamento no disco de onde a API esta
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default{
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MAX_FILE_SIZE,
  MAX_SIZE,
  MULTER,
  ACCEPTED_IMAGE_TYPES,
};
