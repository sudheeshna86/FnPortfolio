const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: 'invalid credentials' });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });

  const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
  const token = jwt.sign({ id: admin._id, username: admin.username }, secret, { expiresIn: '7d' });
  res.json({ token, username: admin.username });
});

module.exports = { login };
