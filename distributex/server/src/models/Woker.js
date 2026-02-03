import mongoose from 'mongoose';

/**
 * Worker Schema
 * Represents a worker node in the MapReduce cluster
 */

const workerSchema = new mongoose.Schema({
  // Worker Identity
  workerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  processId: {
    type: Number,
    required: true
  },

  // Status
  status: {
    type: String,
    required: true,
    enum: ['idle', 'busy', 'error', 'offline'],
    default: 'idle',
    index: true
  },

  // Current Task
  currentJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: null
  },

  currentTask: {
    type: String,
    enum: ['map', 'reduce', null],
    default: null
  },

  assignedChunks: [{
    type: Number
  }],

  // Performance Metrics
  tasksCompleted: {
    type: Number,
    default: 0
  },

  tasksSucceeded: {
    type: Number,
    default: 0
  },

  tasksFailed: {
    type: Number,
    default: 0
  },

  averageTaskDuration: {
    type: Number,  // milliseconds
    default: 0
  },

  // Health Monitoring
  lastHeartbeat: {
    type: Date,
    default: Date.now,
    index: true
  },

  cpu: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  memory: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  // Timing
  startedAt: {
    type: Date,
    default: Date.now
  },

  lastTaskCompletedAt: {
    type: Date,
    default: null
  }

}, {
  timestamps: true,
  collection: 'workers'
});

// Index for finding available workers
workerSchema.index({ status: 1, lastHeartbeat: -1 });

// Virtual for uptime
workerSchema.virtual('uptime').get(function() {
  return Date.now() - this.startedAt.getTime();
});

// Virtual for success rate
workerSchema.virtual('successRate').get(function() {
  if (this.tasksCompleted === 0) return 100;
  return Math.round((this.tasksSucceeded / this.tasksCompleted) * 100);
});

// Method to check if worker is healthy
workerSchema.methods.isHealthy = function() {
  const now = Date.now();
  const timeout = 30000; // 30 seconds
  return (now - this.lastHeartbeat.getTime()) < timeout;
};

// Method to update heartbeat
workerSchema.methods.heartbeat = function(cpuUsage, memoryUsage) {
  this.lastHeartbeat = new Date();
  this.cpu = cpuUsage;
  this.memory = memoryUsage;
  
  if (!this.isHealthy()) {
    this.status = 'offline';
  }
  
  return this.save();
};

// Static method to find available workers
workerSchema.statics.findAvailable = function() {
  return this.find({
    status: 'idle',
    lastHeartbeat: { $gte: new Date(Date.now() - 30000) }
  }).sort({ tasksCompleted: 1 }); // Least loaded workers first
};

export default mongoose.model('Worker', workerSchema);