import express from 'express';
import uploads from './uploads';
const routers = express();

routers.use('/uploads', uploads);

export default routers;
