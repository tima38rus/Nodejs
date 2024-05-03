const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const multerrab = require('multer');
const app = express();
const port = 8001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use('/save/posetitel', express.static(path.join(__dirname, '/save/posetitel')));
app.use('/save/rabotnik', express.static(path.join(__dirname, '/save/rabotnik')));
const db = mysql.createPool({
connectionLimit : 10,
host: 'sql11.freemysqlhosting.net',
user: 'sql11703421',
password: 'lvZqPAdC3Q',
database: 'sql11703421'
});

console.log('Connected to the database');
app.get('/Posetitel/index/:id', (req, res) => {
    let query = 'SELECT * FROM posetitel WHERE id = ?';
    db.query(query, req.params.id, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }
    if (result.length > 0) {
    res.json(result[0]);
    } else {
    res.status(404).send('User not found');
    }
    });
    });
app.get('/Posetitel/index', (req, res) => {
db.query('SELECT * FROM posetitel', (err, results) => {
if (err) throw err;
res.json(results);
});
});

app.get('/Rabotnik/index/:id', (req, res) => {
    let query = 'SELECT * FROM rabotnik WHERE id = ?';
    db.query(query, req.params.id, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }
    if (result.length > 0) {
    res.json(result[0]);
    } else {
    res.status(404).send('User not found');
    }
    });
    });
app.get('/Rabotnik/index', (req, res) => {
db.query('SELECT * FROM rabotnik', (err, results) => {
if (err) throw err;
res.json(results);
});
});

app.get('/populaterab', (req, res) => {
    fs.readFile(path.join(__dirname, 'assets', 'rabotnik.txt'), 'utf-8', (err, data) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }

    let lines = data.split('\n');
    lines.forEach(line => {
    let fields = line.split(';');
    if (fields.length >= 9) {
    let item = {
    Фамилия: fields[0],
    Имя: fields[1],
    Отчество: fields[2],
    Рост: fields[3],
    Должность: fields[4],
    Стаж: fields[5],
    Образование: fields[6],
    Возраст: fields[7],
    Фото: '/save/rabotnik/' + getRandomPhotoRab()
    };
    let query = 'INSERT INTO rabotnik SET ?';
    db.query(query, item, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }
    });
    }
    });

    res.send('Database populated successfully');
    });
    });

    function getRandomPhotoRab() {
    let files = fs.readdirSync(path.join(__dirname, 'assets', 'rabotnik'));
    let file = files[Math.floor(Math.random() * files.length)];
    return file;
    }


app.get('/populate', (req, res) => {
    fs.readFile(path.join(__dirname, 'assets', 'posetitel.txt'), 'utf-8', (err, data) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }

    let lines = data.split('\n');
    lines.forEach(line => {
    let fields = line.split(';');
    if (fields.length >= 9) {
    let item = {
    Название: fields[0],
    Бренд: fields[1],
    Цена: fields[2],
    Состав: fields[3],
    Объем: fields[4],
    Описание: fields[5],
    Рейтинг: fields[6],
    Год: fields[7],
    Фото: '/save/posetitel/' + getRandomPhoto()
    };
    let query = 'INSERT INTO posetitel SET ?';
    db.query(query, item, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
    return;
    }
    });
    }
    });

    res.send('Database populated successfully');
    });
    });

    function getRandomPhoto() {
    let files = fs.readdirSync(path.join(__dirname, 'assets', 'zapis'));
    let file = files[Math.floor(Math.random() * files.length)];
    return file;
    }
    const storagerab = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'save/rabotnik/')
        },
        filename: function (req, file, cb) {
        cb(null, file.originalname)
        }
        })
        const uploadrab = multerrab({ storage: storagerab });
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, 'save/posetitel/')
},
filename: function (req, file, cb) {
cb(null, file.originalname)
}
})
const upload = multer({ storage: storage });


// Маршрут для загрузки файла
app.post('/save/posetitel/', upload.single('file'), (req, res) => {
    if (!req.file) {
    console.log("No file received");
    return res.status(400).send({
    success: false,
    message: 'No file received'
    });
    } else {
    console.log('file received successfully');
    return res.send({
    success: true,
    message: 'File received successfully'
    });
    }
    });
    
    // Маршрут для отправки данных формы
    app.post('/Posetitel/index', (req, res) => {
    let newItem = req.body;
    console.log(newItem); // Добавьте эту строку, чтобы увидеть, что приходит в запросе
    let query = 'INSERT INTO posetitel SET ?';
    db.query(query, newItem, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message); // Добавьте сообщение об ошибке, чтобы увидеть, в чем проблема
    return;
    }
    res.send('Item added successfully');
    });
    });

// Маршрут для загрузки файла
app.post('/save/rabotnik/', uploadrab.single('file'), (req, res) => {
    if (!req.file) {
    console.log("No file received");
    return res.status(400).send({
    success: false,
    message: 'No file received'
    });
    } else {
    console.log('file received successfully');
    return res.send({
    success: true,
    message: 'File received successfully'
    });
    }
    });
    
    // Маршрут для отправки данных формы
    app.post('/Rabotnik/index', (req, res) => {
    let newItem = req.body;
    console.log(newItem); // Добавьте эту строку, чтобы увидеть, что приходит в запросе
    let query = 'INSERT INTO rabotnik SET ?';
    db.query(query, newItem, (err, result) => {
    if (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message); // Добавьте сообщение об ошибке, чтобы увидеть, в чем проблема
    return;
    }
    res.send('Item added successfully');
    });
    });

    app.put('/Posetitel/index/:id', upload.single('file'), (req, res) => {
        let updatedItem = req.body;
        if (req.file) {
        updatedItem.Фото = '/save/posetitel/' + req.file.filename;
        }
        let query = 'UPDATE posetitel SET ? WHERE id = ?';
        db.query(query, [updatedItem, req.params.id], (err, result) => {
        if (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err.message);
        return;
        }
        res.send('Item updated successfully');
        });
        });

        app.put('/Rabotnik/index/:id', upload.single('file'), (req, res) => {
            let updatedItem = req.body;
            if (req.file) {
            updatedItem.Фото = '/save/rabotnik/' + req.file.filename;
            }
            let query = 'UPDATE rabotnik SET ? WHERE id = ?';
            db.query(query, [updatedItem, req.params.id], (err, result) => {
            if (err) {
            console.error(err);
            res.status(500).send('Server error: ' + err.message);
            return;
            }
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

app.delete('/Rabotnik/index/:id', (req, res) => {
    let query = 'DELETE FROM rabotnik WHERE id = ?';
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