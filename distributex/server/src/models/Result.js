import mongoose from 'mongoose';

/**
 * Result Schema
 * Stores intermediate and final MapReduce results
 */
const resultSchema = new mongoose.Schema({
  // Associated Job
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true
  },
  
  // Phase
  phase: {
    type: String,
    enum: ['map', 'shuffle', 'reduce'],
    required: true,
    index: true
  },
  
  // Worker who produced this
  workerId: {
    type: String,
    required: true
  },
  
  // Chunk information
  chunkId: {
    type: Number,
    required: true
  },
  
  // The actual data
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Metadata
  recordCount: {
    type: Number,
    default: 0
  },
  
  processingTime: {
    type: Number, // milliseconds
    required: true
  },
  
  // For debugging
  error: {
    type: String,
    default: null
  }
  
}, {
  timestamps: true,
  collection: 'results'
});

// Compound index for efficient queries
resultSchema.index({ jobId: 1, phase: 1, chunkId: 1 });

// Static method to get all map results for a job
resultSchema.statics.getMapResults = function(jobId) {
  return this.find({ jobId, phase: 'map' }).sort({ chunkId: 1 });
};

// Static method to get final results for a job
resultSchema.statics.getFinalResults = function(jobId) {
  return this.findOne({ jobId, phase: 'reduce' }).sort({ createdAt: -1 });
};

export default mongoose.model('Result', resultSchema);