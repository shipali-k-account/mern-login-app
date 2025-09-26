const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Add new agent
exports.addAgent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, mobile, password } = req.body;
  try {
    let existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();

    res.status(201).json({ message: 'Agent added successfully', agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all agents
exports.listAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json({ agents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
