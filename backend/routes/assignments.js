const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const AssignedList = require('../models/AssignedList');

router.get('/', protect, async (req, res) => {
  if (req.user.role === 'agent') {
    const lists = await AssignedList.find({ agent: req.user._id });
    return res.json({ lists });
  } else {
    const lists = await AssignedList.find().populate('agent', 'name email phone');
    return res.json({ lists });
  }
});

module.exports = router;

