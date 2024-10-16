import { Injectable } from '@nestjs/common';
import { bucket } from 'src/firebase.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    const uniqueFileName = `upload/${uuidv4()}_${file.originalname}`;
    const bucketFile = bucket.file(uniqueFileName);

    const blobStream = bucketFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject('Upload failed: ' + err.message);
      });

      blobStream.on('finish', async () => {
        try {
          await bucketFile.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${bucketFile.name}`;
          console.log('Public URL:', publicUrl);
          resolve(publicUrl);
        } catch (err) {
          reject('Erro ao tornar o arquivo público: ' + err.message);
        }
      });

      blobStream.end(file.buffer);
    });
  }
}
