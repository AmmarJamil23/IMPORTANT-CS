import mongoose from 'mongoose';

/**
 * Worker Schema
 * Represents a worker node in the distributed system
 */
const workerSchema = new mongoose.Schema({
  // Worker Identity
  workerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  hostname: {
    type: String,
    required: true
  },
  
  pid: {
    type: Number,
    required: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['idle', 'busy', 'offline'],
    default: 'idle',
    index: true
  },
  
  // Current Assignment
  currentJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: null
  },
  
  currentChunks: {
    type: [Number],
    default: []
  },
  
  // Performance Metrics
  metrics: {
    tasksCompleted: {
      type: Number,
      default: 0
    },
    tasksFailed: {
      type: Number,
      default: 0
    },
    averageProcessingTime: {
      type: Number,
      default: 0
    },
    totalProcessingTime: {
      type: Number,
      default: 0
    }
  },
  
  // System Resources
  resources: {
    cpuUsage: Number,
    memoryUsage: Number,
    availableMemory: Number
  },
  
  // Health Check
  lastHeartbeat: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  isHealthy: {
    type: Boolean,
    default: true
  }
  
}, {
  timestamps: true,
  collection: 'workers'
});

// Index for finding available workers
workerSchema.index({ status: 1, isHealthy: 1, lastHeartbeat: -1 });

// Virtual for uptime
workerSchema.virtual('uptime').get(function() {
  return Date.now() - this.createdAt.getTime();
});

// Method to update heartbeat
workerSchema.methods.heartbeat = function() {
  this.lastHeartbeat = Date.now();
  this.isHealthy = true;
  return this.save();
};

// Static method to find available workers
workerSchema.statics.findAvailable = function() {
  return this.find({
    status: 'idle',
    isHealthy: true,
    lastHeartbeat: { $gte: Date.now() - 30000 } // Active in last 30s
  }).sort({ tasksCompleted: 1 }); // Least busy first
};

// Static method to mark stale workers as offline
workerSchema.statics.markStaleWorkers = async function() {
  const staleTime = Date.now() - 30000; // 30 seconds
  
  return this.updateMany(
    { lastHeartbeat: { $lt: staleTime }, status: { $ne: 'offline' } },
    { status: 'offline', isHealthy: false }
  );
};

export default mongoose.model('Worker', workerSchema);