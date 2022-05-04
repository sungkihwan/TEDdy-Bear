import * as  multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';

const uploadHandler = multer({
    storage: MulterGoogleCloudStorage.storageEngine({
        autoRetry: true,
        bucket: '',
        projectId: '',
        keyFilename: '',
        filename: (req, file, cb) => {
            cb(null, `/images/${Date.now()}_${filename}`);
        }
    })
});

export { uploadHandler }