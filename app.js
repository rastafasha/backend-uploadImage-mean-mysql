const express = require('express');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const mysqlConnect = require('./database');
const fileSistem = require('fs').promises;

const app = express();

//rutas par guardar imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });


//middlewares
app.use(cors([origin = "*"]));
app.use(express.json());
app.use(morgan('start'));


//rutas
/*app.get('/', (req, res) => { //validamos la conexion a la bd
    mysqlConnect.query('SELECT * From files', (err, rows, fields) => {
        res.json(rows);
    });
});*/

app.get("/upload", (req, res) => {
    mysqlConnect.query('SELECT * FROM  files', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

app.post('/file', upload.single('file'), (req, res, next) => {

    const file = req.file;

    const fileImg = {
        id: null,
        nombre: file.filename,
        imagen: file.path,
        fecha_creacion: null
    };


    if (!file) {
        const error = new Error('No file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
    console.log(fileImg);
    mysqlConnect.query('INSERT INTO files set ?', [fileImg]);
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM files WHERE id=?', [id]);
    res.json({
        message: 'El archivo fue eliminado'
    });

    function deleteFile(id) {
        mysqlConnect.query('SELECT * FROM files WHERE id=?', [id], (err, rows, filds) => {
            [{ imagen }] = rows;
            fileSistem.unlink(path.resolve('./' + imagen)).then(() => {
                console.log('Imagen eliminada');
            }).catch(err => { console.error('no exite el archivo') });
        });
    }
});

// puerto de conexion al server
app.listen(3000, () => {
    console.log('Server is running in port: 3000');
});