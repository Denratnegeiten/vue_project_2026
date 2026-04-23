const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Vue Project 2026 API',
    version: '1.0.0',
    description: 'Документация API для учебного проекта'
  },
  servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  paths: {
    '/api/ads': {
      get: {
        summary: 'Получить все объявления',
        responses: { '200': { description: 'Список объявлений' } }
      },
      post: {
        summary: 'Создать новое объявление с картинкой',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  ownerId: { type: 'integer' },
                  promo: { type: 'string' },
                  image: { type: 'string', format: 'binary' }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Объявление создано' } }
      }
    }
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000
});
db.getConnection((err, connection) => {
  if (err) {
    console.error('ОШИБКА БАЗЫ ДАННЫХ:');
    console.error('Сообщение:', err.message);
    console.error('Код ошибки:', err.code);
    return;
  }
  console.log('УСПЕХ: База данных на сервере ответила и подключилась!');
  connection.release();
});
app.get('/api/ads', (req, res) => {
  db.execute('SELECT * FROM ads', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/ads', upload.single('image'), (req, res) => {
  const { title, description, ownerId, promo } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.originalname}` : (req.body.imageSrc || '');

  if (!ownerId) {
    return res.status(400).json({ error: 'ownerId is missing' });
  }

  const query = 'INSERT INTO ads (title, description, ownerId, imageSrc, promo) VALUES (?, ?, ?, ?, ?)';
  const values = [title, description, ownerId, imagePath, promo === 'true' || promo === '1' ? 1 : 0];

  db.execute(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Объявление создано', id: result.insertId, imageSrc: imagePath });
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.execute(query, [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'OK' });
    });
  } catch (e) { res.status(500).send(); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    db.execute('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err || results.length === 0) return res.status(401).send();
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send();
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, email: user.email } });
    });
  } catch (e) { res.status(500).send(); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});