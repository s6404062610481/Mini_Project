var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken')
const secret = 'fullstack'


app.use(cors())

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'canfly'
});

app.post('/register', jsonParser, function (req, res, next) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    connection.execute(
      'INSERT INTO customer (username, password, fname, surname, email, phone) VALUES (?,?,?,?,?,?)',
      [req.body.username, hash, req.body.fname, req.body.surname, req.body.email, req.body.phone],
      function(err, results, fields) {
        if(err) {
          res.json({status: 'error', message: err})
          return
        }
        res.json({status: 'ok'})
      }
    );
  });
})

app.post('/login', jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM customer WHERE username =?',
    [req.body.username],
    function(err, customer, fields) {
      if(err) {
        res.json({status: 'error', message: err});
        return
      }
      if(customer.length == 0) {
        res.json({status: 'error', message: 'No user found'});
        return
      }
      bcrypt.compare(req.body.password, customer[0].password, function(err, isLogin) {
        if(isLogin) {
          var token = jwt.sign({username: customer[0].username}, secret, { expiresIn: '1h' });
          res.json({status: 'ok', message: 'success',token});
        } else{
          res.json({status: 'error', message: 'error'});
        }
      });
    }
  );
})

app.post('/authen', jsonParser, function (req, res, next) {
  try {
    const token =  req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({status: 'ok',decoded})
  } catch (err) {
    res.json({status: 'error',message: err.message})
  }
})
// Search flight
app.get('/flight',jsonParser, function (req, res) => {
  const selectQuery = 'SELECT * FROM customer';

 
    }

// Handle data insertion into MySQL
app.post('/flight', (req, res) => {
  const { name, description } = req.body; // Assuming you expect 'name' and 'description' in the request body

  // Perform data insertion into the MySQL database
  const query = 'INSERT INTO flight (Sid, snumber, price, status, Fid, Bid) VALUES (?,?,?,?,?,?)';
  const values = [name, description];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into the database');
    } else {
      res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
    }
  });
});


app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})