const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String
});

const AssignedListSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  items: [ItemSchema],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  totalItems: Number
}, { timestamps: true });

module.exports = mongoose.model('AssignedList', AssignedListSchema);
