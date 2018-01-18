import fs from 'fs';
import File from '../models/file';
import { DOMAIN, CODE } from '../constants';

export const uploadFile = (req, res) => {
  if (typeof req.file !== 'undefined') {
    const mFile = new File({
      mimeType: req.file.mimetype,
      name: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      url: `${DOMAIN}${req.file.path}`,
    });

    mFile.save(function(err) {
      if (err) {
        res.json({
          code: CODE.EXCEPTION_ERROR,
          message: err.message,
        });
      } else {
        res.json({
          code: CODE.SUCCESS,
          file: {
            id: mFile._id,
            url: mFile.url,
            mimeType: mFile.mimeType,
          },
        });
      }
    });
  } else {
    res.json({
      code: CODE.ERROR,
      message: 'upload fail',
    });
  }
};

export const removeFile = (req, res) => {
  const fileId = req.params.fileId;

  File.findOneAndRemove({
    _id: fileId,
  }, function(err, file) {
    if (err) {
      res.json({
        code: CODE.EXCEPTION_ERROR,
      });
    } else if (!file) {
      res.json({
        code: CODE.OBJECT_NOT_FOUND,
      });
    } else {
      fs.unlink(file.path, (err) => {
        if (err) {
          res.json({
            code: CODE.EXCEPTION_ERROR,
          });
        } else {
          res.json({
            code: CODE.SUCCESS,
          });
        }
      });
    }
  });
};
