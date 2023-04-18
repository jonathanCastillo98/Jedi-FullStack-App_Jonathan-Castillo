import { Router } from 'express';
import jediRoutes from './jedi.routes';

const router = Router();

router.use('/Jedis', jediRoutes);

export default router;