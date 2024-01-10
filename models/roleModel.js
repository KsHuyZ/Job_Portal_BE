const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
    },
    roleNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Role", roleSchema);