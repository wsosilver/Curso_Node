import { Router } from 'express';
import SessionControlle from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import Multer from 'multer';
import uploadConfig from './config/uploads';

const routes = new Router();
const upload = new Multer(uploadConfig) 

routes.post('/sessions', SessionControlle.index)
routes.post('/houses', upload.single('thumbnail'), HouseController.store )
routes.get('/houses', HouseController.index)
routes.put('/houses/:house_id',upload.single('thumbnail') , HouseController.update)
routes.delete('/houses', HouseController.destroy)

export default routes;