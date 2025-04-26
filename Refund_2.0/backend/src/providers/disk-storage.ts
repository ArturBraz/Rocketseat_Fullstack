import fs from "node:fs";
import path from "node:path";

import uploadConfig from "@/configs/upload";

class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file); //arquivo na pasta temp
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); //destino do arquivo

    try {
      await fs.promises.access(tmpPath); //tenta acessar o arquivo q esta na pasta 'tmp'
    } catch (error) {
      console.log(error);
      throw new Error(`Arquivo não encontrado: ${tmpPath}`);
    }

    await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true }); //serve para garantir que a pasta 'Uploads' exista

    await fs.promises.rename(tmpPath, destPath); //muda o arquivo de lugar

    return file;
  }

  async deleteFile(file: string, type: "tmp" | "upload") {
    const pathFile =
      type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER;

      const filePath = path.resolve(pathFile,file)

      try {
        await fs.promises.stat(filePath) //verifica o status do arquivo, se disponivel
      } catch (error) {
        return error
      }

      await fs.promises.unlink(filePath) //remove o arquivo
  }
}

export { DiskStorage };
