import express from 'express';
import multer from 'multer';
import { uploadFile, removeFile } from '../controllers/files';

const getRandomInt = function() {
  const min = Math.ceil(1000000000);
  const max = Math.floor(9000000000);
  return Math.floor(Math.random() * (max - min)) + min;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileNames = file.originalname.split('.');
    let name = '';
    name = `${getRandomInt()}-${Date.now()}.${fileNames[fileNames.length - 1]}`;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: '10MB' },
});

const isVerifiedToken = (req, res, next) => {
  next();
};

const router = express.Router();

router.post('/files', upload.single('file'), uploadFile);
router.delete('/files/:fileId', isVerifiedToken, removeFile);
export default router;
