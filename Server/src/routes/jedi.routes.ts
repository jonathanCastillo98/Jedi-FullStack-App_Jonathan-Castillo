import { Router } from 'express';
import controllers from '../controllers';

const jediRoutes = Router();
const { jediController } = controllers;

jediRoutes.post('/', jediController.createJedi);
jediRoutes.get('/', jediController.getAllJedis);
jediRoutes.get('/:id', jediController.getJediByPk);
jediRoutes.patch('/:id', jediController.updateJediByPk);
jediRoutes.delete('/:id', jediController.deleteJediByPk);


export default jediRoutes;