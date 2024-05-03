const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
const port = 8001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const db = mysql.createPool({
connectionLimit : 10,
host: 'timofea5.beget.tech',
user: 'timofea5_Parfum',
password: 'Q1qqqqqq',
database: 'timofea5_Parfum'
});

console.log('Connected to the database');

app.get('/Posetitel/index', (req, res) => {
db.query('SELECT * FROM posetitel', (err, results) => {
if (err) throw err;
res.json(results);
});
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'assets/savefoto/')
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
    }
    })
    
    const upload = multer({ storage: storage });
    app.use(upload.any());
 // Маршрут для загрузки файла
app.post('/assets/savefoto/', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
    });
    
    // Маршрут для отправки данных формы
    app.post('/Posetitel/index', (req, res) => {
    const newStudent = req.body;
    
    db.query(
    'INSERT INTO posetitel (Фамилия, Имя, Отчество, Возраст, Размер_багажа, Судимость, Комната, Питомец, Мини_бар, Фото) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [newStudent.Фамилия, newStudent.Имя, newStudent.Отчество, newStudent.Возраст, newStudent.Размер_багажа, newStudent.Судимость, newStudent.Комната, newStudent.Питомец, newStudent.Мини_бар, newStudent.Фото ], (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error');
    return;
    }
    res.send('Item added successfully');
    });
    });
//     // Добавить нового студента
// app.post('/Posetitel/index', (req, res) => {
//     const newStudent = req.body;
//     const connection = mysql.createConnection(config);
//     connection.query(
//     'INSERT INTO posetitel (Фамилия, Имя, Отчество, Возраст, Размер_багажа, Судимость, Комната, Питомец, Мини_бар, Фото) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//     [newStudent.Фамилия, newStudent.Имя, newStudent.Отчество, newStudent.Возраст, newStudent.Размер_багажа, newStudent.Судимость, newStudent.Комната, newStudent.Питомец, newStudent.Мини_бар, newStudent.Фото ],
//     function(err, results, fields) {
//     if (err) {
//     console.error('Ошибка запроса:', err);
//     res.status(500).json({ error: 'Ошибка при добавлении студента' });
//     } else {
//     res.status(201).json({ message: 'Студент успешно добавлен' });
//     }
//     connection.end();
//     }
//     );
//     });

app.put('/Posetitel/index/:id', upload.single('file'), (req, res) => {
let updatedItem = req.body;
updatedItem.Фото = '/assets/savefoto/' + req.file.filename;
let query = 'UPDATE posetitel SET ? WHERE id = ?';
db.query(query, [updatedItem, req.params.id], (err, result) => {
if (err) throw err;
res.send('Item updated successfully');
});
});

app.delete('/Posetitel/index/:id', (req, res) => {
let query = 'DELETE FROM posetitel WHERE id = ?';
db.query(query, req.params.id, (err, result) => {
if (err) throw err;
res.send('Item deleted successfully');
});
});

const server = http.createServer((req, res) => {
let filePath = path.join(__dirname, req.url === '/' ? 'pages/index.html' : req.url);
let extname = path.extname(filePath);
let contentType = 'text/html';

switch (extname) {
case '.js':
contentType = 'text/javascript';
break;
case '.css':
contentType = 'text/css';
break;
case '.json':
contentType = 'application/json';
break;
case '.png':
contentType = 'image/png';
break;
case '.jpg':
contentType = 'image/jpg';
break;
}

fs.readFile(filePath, (err, content) => {
if (err) {
res.writeHead(500);
res.end(`Error: ${err.message}`);
} else {
res.writeHead(200, { 'Content-Type': contentType });
res.end(content, 'utf-8');
}
});
});

app.listen(port, () => {
console.log(`Server running at http://127.0.0.1:${port}/`);
});

