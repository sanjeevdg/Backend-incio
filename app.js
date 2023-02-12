const express = require("express");
const http = require("http");
const sequelize = require('./utils/database.js');
var cors = require('cors');
const multer = require('multer');

const router = require('./routes/routes.js');
const bodyParser = require("body-parser");
const app = express();

const GlossaryTerm = require('./models/glossaryterm.js');

app.set('port', (process.env.PORT || 5000));

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5MB' }))
app.use(bodyParser.raw());

//app.use('/uploads', express.static(__dirname + '/uploads'));


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })



var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(router);


app.use('/appdemo', express.static(__dirname + '/appdemo'));

app.post('/uploadProfileImage', upload.single('file'), function (req, res) {
    console.log('hit imgupl endpoint');
  res.json({'message':'ok'})
});

sequelize.sync(); 


app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
