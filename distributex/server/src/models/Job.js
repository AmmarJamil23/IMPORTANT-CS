import mongoose from 'mongoose';

// JobSchema => Represents a MapReduce job in the system

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Job name is required'],
        trim: true,
        maxlength: [100, 'Job name cannot exceed 100 characters']
    },

    type: {
        type: String,
        required: true,
        enum: ['wordcount', 'log-analysis', 'inverted-index', 'custom'],
        default: 'wordcount'
    },

    status: {
        type: String,
        required: true,
        enum: ['pending', 'mapping', 'shuffling', 'reducing', 'completed', 'failed'],
        default: 'pending',
        index: true
    },

    inputFile: {
        originalName: String,
        path: String,
        size: Number,
        mimeType: String
    },

    //processing info
    totalChunks: {
        type: Number,
        default: 0
    },

    chunksProcessed: {
        type: Number,
        default: 0
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }

    //Worker aassignment
    assignedWorkers: [{
        workerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Worker'
        },
        chunkIds: [Number],
        status: {
            type: String,
            enum: ['assigned', 'processing', 'completed', 'failed']
        }
    }],

    //Map function (stored as string)
    mapFunction: {
        type: String,
        default: null
    },

    //Reduce function (stored as string)
    reduceFunction: {
        type: String,
        default: null
    },

    //results
    results: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: new Map()
    },

    //performace metrics
    metrics: {
        startTime: Date,
        endTime: Date,
        mapDuration: Number,
        shuffleDuration: Number,
        reduceDuration: Number,
        totalDuration: Number
    },

    //Error Tracking
    errors: [{
        workerId: mongoose.Schema.Types.ObjectId,
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        }

    }]
}, {
    timestamps: true, //Adds createdAt, updatedat automatically
    collection: 'jobs'
})


// Indexes for performace
jobSchema.index({ status: 1, createdAt: -1 });//recent jobs by status
jobSchema.index({ createdAt: -1 }); //recent jobs

//Virtual for completion percentage
jobSchema.virtual('completionPercentage').get(function() {
    if (this.totalChunks === 0) return 0;
    return Math.round((this.chunksProcessed / this.totalChunks) * 100);
});

//Method to update progress
jobSchema.methods.updateProgress = function() {
    this.progress = this.completionPercentage;
    return this.save();
};

//static method to find active jobs

jobSchema.statics.findActive = function() {
    return this.find({
        status: { $in: ['pending', 'mapping', 'shuffling', 'reducing'] }
    }).sort({ createdAt: -1 });
};

export default mongoose.model('Job', jobSchema);