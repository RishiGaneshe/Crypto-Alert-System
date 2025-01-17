const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    userId: {   type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    cryptocurrency: {   type: String,  required: true, trim: true },
    targetPrice: {type: Number, required: true },
    condition: { type: String, enum: ['above', 'below'], required: true},
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    notifiedAt: { type: Date, default: null,
  }
});

module.exports = mongoose.model('Alert', alertSchema);
