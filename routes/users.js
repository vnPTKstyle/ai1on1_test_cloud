import express from 'express';
import db from '../db/index.js';

const router = express.Router();

// GET /api/users - Danh sách user
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, name, email, phone, created_at, updated_at
      FROM users
      ORDER BY id DESC
    `).all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/users/:id - Chi tiết user
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const user = db.prepare(`
      SELECT id, name, email, phone, created_at, updated_at
      FROM users WHERE id = ?
    `).get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/users - Thêm user
router.post('/', (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name và email là bắt buộc' });
    }
    const stmt = db.prepare(`
      INSERT INTO users (name, email, phone)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(name.trim(), email.trim(), (phone || '').trim());
    const user = db.prepare(`
      SELECT id, name, email, phone, created_at, updated_at
      FROM users WHERE id = ?
    `).get(info.lastInsertRowid);
    res.status(201).json(user);
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/users/:id - Sửa user
router.put('/:id', (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name và email là bắt buộc' });
    }
    const id = req.params.id;
    const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'User not found' });
    db.prepare(`
      UPDATE users
      SET name = ?, email = ?, phone = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name.trim(), email.trim(), (phone || '').trim(), id);
    const user = db.prepare(`
      SELECT id, name, email, phone, created_at, updated_at
      FROM users WHERE id = ?
    `).get(id);
    res.json(user);
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/users/:id - Xóa user
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const user = db.prepare(`
      SELECT id, name, email, phone, created_at, updated_at
      FROM users WHERE id = ?
    `).get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
