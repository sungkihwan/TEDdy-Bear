import * as multer from "multer";
import MulterGoogleCloudStorage from "multer-google-storage";

const bucket = process.env.GCS_BUCKET;
const projectId = process.env.GCLOUD_PROJECT;
const keyFilename = process.env.GCS_KEYFILE;

const uploadHandler = multer({
  storage: MulterGoogleCloudStorage.storageEngine({
    autoRetry: true,
    maxRetries: 3,
    bucket: bucket,
    projectId: projectId,
    keyFilename: keyFilename,
    filename: (req, file, cb) => {
      cb(null, `/images/${Date.now()}_${filename}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
});

export { uploadHandler };
