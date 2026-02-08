import express from 'express';
import workerController from '../controllers/workerController.js';

const router = express.Router();

// Worker routes
router.get('/stats', workerController.getWorkerStats);     // Must be before /:id
router.get('/', workerController.getAllWorkers);
router.get('/:id', workerController.getWorkerById);
router.post('/register', workerController.registerWorker);
router.post('/:id/heartbeat', workerController.heartbeat);

export default router;