const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobsHistorySchema = new mongoose.Schema({
    jobId: {
        type: ObjectId,
        ref: "Job",
        required: true
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    cv: {
        type: String,
        required: [true, 'cv is required']
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("JobHistory", jobsHistorySchema);