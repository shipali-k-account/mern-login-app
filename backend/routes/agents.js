const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const agentController = require('../controllers/agentController');

const protect = require('../middleware/auth'); 

// Test route
router.get('/test', (req, res) => res.send('✅ Agents route working'));

// Add agent
router.post(
  '/add',
  protect,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  agentController.addAgent
);

// List agents
router.get('/',protect, agentController.listAgents);

module.exports = router;
