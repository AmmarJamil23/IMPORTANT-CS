import express from 'express';
import jobController from '../controllers/jobController.js';

const router = express.Router();

// Job routes
router.get('/stats', jobController.getJobStats);           // Must be before /:id
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', jobController.createJob);
router.patch('/:id/status', jobController.updateJobStatus);
router.delete('/:id', jobController.deleteJob);

export default router;