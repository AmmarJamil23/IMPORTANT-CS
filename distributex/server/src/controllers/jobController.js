import Job from '../models/Job.js';
import Worker from '../models/Worker.js';

/**
 * Job Controller
 * Handles all job-related operations
 */
class JobController {
  
  /**
   * GET /api/jobs
   * Get all jobs with optional filtering
   */
  async getAllJobs(req, res) {
    try {
      const { status, limit = 50, page = 1 } = req.query;
      
      // Build filter
      const filter = {};
      if (status) {
        filter.status = status;
      }
      
      // Calculate pagination
      const skip = (page - 1) * limit;
      
      // Query database
      const jobs = await Job.find(filter)
        .sort({ createdAt: -1 })  // Newest first
        .limit(parseInt(limit))
        .skip(skip)
        .select('-mapFunction -reduceFunction'); // Don't send functions to frontend
      
      // Get total count for pagination
      const total = await Job.countDocuments(filter);
      
      res.json({
        success: true,
        data: jobs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch jobs',
        message: error.message
      });
    }
  }
  
  /**
   * GET /api/jobs/:id
   * Get single job by ID
   */
  async getJobById(req, res) {
    try {
      const { id } = req.params;
      
      const job = await Job.findById(id)
        .populate('assignedWorkers.workerId', 'workerId hostname status');
      
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }
      
      res.json({
        success: true,
        data: job
      });
      
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch job',
        message: error.message
      });
    }
  }
  
  /**
   * POST /api/jobs
   * Create a new job
   */
  async createJob(req, res) {
    try {
      const { name, type, inputFile } = req.body;
      
      // Validation
      if (!name || !type) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: name and type'
        });
      }
      
      // Create job
      const job = await Job.create({
        name,
        type,
        inputFile,
        status: 'pending'
      });
      
      res.status(201).json({
        success: true,
        data: job,
        message: 'Job created successfully'
      });
      
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create job',
        message: error.message
      });
    }
  }
  
  /**
   * PATCH /api/jobs/:id/status
   * Update job status
   */
  async updateJobStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Validate status
      const validStatuses = ['pending', 'mapping', 'shuffling', 'reducing', 'completed', 'failed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }
      
      const job = await Job.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
      
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }
      
      res.json({
        success: true,
        data: job,
        message: `Job status updated to ${status}`
      });
      
    } catch (error) {
      console.error('Error updating job status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update job status',
        message: error.message
      });
    }
  }
  
  /**
   * DELETE /api/jobs/:id
   * Delete a job (only if not running)
   */
  async deleteJob(req, res) {
    try {
      const { id } = req.params;
      
      const job = await Job.findById(id);
      
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }
      
      // Don't allow deleting running jobs
      const runningStatuses = ['mapping', 'shuffling', 'reducing'];
      if (runningStatuses.includes(job.status)) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete a running job. Cancel it first.'
        });
      }
      
      await job.deleteOne();
      
      res.json({
        success: true,
        message: 'Job deleted successfully'
      });
      
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete job',
        message: error.message
      });
    }
  }
  
  /**
   * GET /api/jobs/stats
   * Get job statistics
   */
  async getJobStats(req, res) {
    try {
      const stats = await Job.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      
      // Format stats
      const formatted = {
        total: 0,
        pending: 0,
        mapping: 0,
        shuffling: 0,
        reducing: 0,
        completed: 0,
        failed: 0
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
      console.error('Error fetching job stats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch job stats',
        message: error.message
      });
    }
  }
}

export default new JobController();