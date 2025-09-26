const csv = require('csvtojson');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const Agent = require('../models/Agent');
const AssignedList = require('../models/AssignedList');

// Upload CSV/XLSX and distribute among 5 agents
exports.uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const ext = path.extname(req.file.originalname).toLowerCase();
    let rows = [];

    if (ext === '.csv') rows = await csv().fromFile(req.file.path);
    else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rows = xlsx.utils.sheet_to_json(sheet);
    } else return res.status(400).json({ message: 'File type not supported' });

    // Basic normalization: ensure objects have firstName and phone
    const parsed = rows.map(r => ({
      firstName: r.FirstName || r.first_name || r.name || r.first || '',
      phone: r.Phone || r.phone || r.mobile || '',
      notes: r.Notes || r.notes || r.Remarks || ''
    }));

    // validate rows
    for (let i = 0; i < parsed.length; i++) {
      if (!parsed[i].firstName || !parsed[i].phone) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: `Row ${i + 1} missing FirstName or Phone` });
      }
    }

    const agents = await Agent.find().limit(5);
    if (agents.length < 5) { fs.unlinkSync(req.file.path); return res.status(400).json({ message: 'Need at least 5 agents' }); }

    const total = parsed.length;
    const base = Math.floor(total / 5);
    const rem = total % 5;

    let index = 0;
    const distributions = [];

    for (let i = 0; i < 5; i++) {
      const count = base + (i < rem ? 1 : 0);
      const items = parsed.slice(index, index + count);
      index += count;

      const assigned = await AssignedList.create({
        agent: agents[i]._id,
        items,
        uploadedBy: null,
        fileName: req.file.originalname,
        totalItems: total
      });

      distributions.push({ agent: agents[i].name, assignedCount: items.length });
    }

    // remove file
    fs.unlinkSync(req.file.path);
    return res.json({ message: 'Distributed successfully', total, distributions });
  } catch (err) {
    console.error(err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: 'Server error' });
  }
};
