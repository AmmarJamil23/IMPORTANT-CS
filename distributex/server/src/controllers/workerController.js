import Worker from '../models/Worker.js';

/**
 * Worker Controller
 * Handles worker registration and monitoring
 */
class WorkerController {
  
  /**
   * GET /api/workers
   * Get all workers
   */
  async getAllWorkers(req, res) {
    try {
      const { status } = req.query;
      
      const filter = {};
      if (status) {
        filter.status = status;
      }
      
      const workers = await Worker.find(filter)
        .populate('currentJob', 'name type status')
        .sort({ createdAt: -1 });
      
      res.json({
        success: true,
        data: workers
      });
      
    } catch (error) {
      console.error('Error fetching workers:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch workers',
        message: error.message
      });
    }
  }
  
  /**
   * GET /api/workers/:id
   * Get single worker by ID
   */
  async getWorkerById(req, res) {
    try {
      const { id } = req.params;
      
      const worker = await Worker.findOne({ workerId: id })
        .populate('currentJob');
      
      if (!worker) {
        return res.status(404).json({
          success: false,
          error: 'Worker not found'
        });
      }
      
      res.json({
        success: true,
        data: worker
      });
      
    } catch (error) {
      console.error('Error fetching worker:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch worker',
        message: error.message
      });
    }
  }
  
  /**
   * POST /api/workers/register
   * Register a new worker
   */
  async registerWorker(req, res) {
    try {
      const { workerId, hostname, pid } = req.body;
      
      // Validation
      if (!workerId || !hostname || !pid) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: workerId, hostname, pid'
        });
      }
      
      // Check if worker already exists
      let worker = await Worker.findOne({ workerId });
      
      if (worker) {
        // Update existing worker
        worker.hostname = hostname;
        worker.pid = pid;
        worker.status = 'idle';
        worker.isHealthy = true;
        worker.lastHeartbeat = Date.now();
        await worker.save();
        
        return res.json({
          success: true,
          data: worker,
          message: 'Worker re-registered successfully'
        });
      }
      
      // Create new worker
      worker = await Worker.create({
        workerId,
        hostname,
        pid,
        status: 'idle',
        isHealthy: true
      });
      
      res.status(201).json({
        success: true,
        data: worker,
        message: 'Worker registered successfully'
      });
      
    } catch (error) {
      console.error('Error registering worker:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to register worker',
        message: error.message
      });
    }
  }
  
  /**
   * POST /api/workers/:id/heartbeat
   * Worker sends heartbeat
   */
  async heartbeat(req, res) {
    try {
      const { id } = req.params;
      const { resources } = req.body;
      
      const worker = await Worker.findOne({ workerId: id });
      
      if (!worker) {
        return res.status(404).json({
          success: false,
          error: 'Worker not found'
        });
      }
      
      // Update heartbeat and resources
      worker.lastHeartbeat = Date.now();
      worker.isHealthy = true;
      
      if (resources) {
        worker.resources = resources;
      }
      
      await worker.save();
      
      res.json({
        success: true,
        message: 'Heartbeat received'
      });
      
    } catch (error) {
      console.error('Error processing heartbeat:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process heartbeat',
        message: error.message
      });
    }
  }
  
  /**
   * GET /api/workers/stats
   * Get worker statistics
   */
  async getWorkerStats(req, res) {
    try {
      const stats = await Worker.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      
      const formatted = {
        total: 0,
        idle: 0,
        busy: 0,
        offline: 0
      };
      
      stats.forEach(stat => {
        formatted[stat._id] = stat.count;
        formatted.total += stat.count;
      });
      
      res.json({
        success: true,
        data: formatted
      });
      
    } catch (error) {
      console.error('Error fetching worker stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch worker stats',
        message: error.message
      });
    }
  }
}

export default new WorkerController();