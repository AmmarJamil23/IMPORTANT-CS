import mongoose from 'mongoose';

/**
 * Result Schema
 * Stores intermediate and final MapReduce results
 */

const resultSchema = new mongoose.Schema({
  // Job Reference
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true
  },

  // Stage (map or reduce)
  stage: {
    type: String,
    required: true,
    enum: ['map', 'reduce'],
    index: true
  },

  // Worker Reference
  workerId: {
    type: String,
    required: true
  },

  // Chunk Info
  chunkId: {
    type: Number,
    required: true
  },

  // Key-Value Pair
  key: {
    type: String,
    required: true,
    index: true
  },

  value: {
    type: mongoose.Schema.Types.Mixed,  // Can be any type
    required: true
  },

  // Metadata
  processedAt: {
    type: Date,
    default: Date.now
  },

  processingTime: {
    type: Number,  // milliseconds
    default: 0
  }

}, {
  timestamps: true,
  collection: 'results'
});

// Compound index for efficient queries
resultSchema.index({ jobId: 1, stage: 1, key: 1 });

// Static method to get all map results for a job
resultSchema.statics.getMapResults = function(jobId) {
  return this.find({ jobId, stage: 'map' }).sort({ key: 1 });
};

// Static method to get final reduce results
resultSchema.statics.getFinalResults = function(jobId) {
  return this.find({ jobId, stage: 'reduce' }).sort({ key: 1 });
};

// Static method to group by key (for shuffle phase)
resultSchema.statics.groupByKey = async function(jobId) {
  return this.aggregate([
    { $match: { jobId: mongoose.Types.ObjectId(jobId), stage: 'map' } },
    {
      $group: {
        _id: '$key',
        values: { $push: '$value' }
      }
    }
  ]);
};

export default mongoose.model('Result', resultSchema);