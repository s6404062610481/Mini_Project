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
  app.get('/api/flight', (req, res) => {
    // Get the variable from the query parameters
     // Get the variable from the query parameters
   const destination = req.query.destination;
   const fdate = req.query.fdate;

   // Construct the SQL query with the variable
   const query = `SELECT * FROM flight WHERE Destination = "${destination}"  AND Fdate =  "${fdate}"`;

    // Execute the SQL query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Return the query results as JSON
      res.json(results);
    });
      }
  );
  
  //get flightall
  app.get('/api/flightall', (req, res) => {
   // Construct the SQL query with the variable
   const query = `SELECT * FROM flight `;

    // Execute the SQL query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      // Return the query results as JSON
      res.json(results);
    });
      }
  );

  //get booking
  app.get('/api/flightbooking', (req, res) => {
    // Get the variable from the query parameters
    const username = req.query.username;

   // Construct the SQL query with the variable
   const query = `SELECT
   S.Sid AS SeatID,
   S.Snumber AS SeatNumber,
   B.Bid AS BookingID,
   S.Fid AS FlightID,
   F.Destination AS FlightDestination,
   F.Fdate AS FlightDate,
   F.Ftime AS FlightTime
FROM
   Customer AS C
   JOIN Booking AS B ON C.Username = '${username}' AND C.Username = B.Username
   JOIN Seat AS S ON B.Bid = S.Bid
   JOIN Flight AS F ON S.Fid = F.Fid; `;

    // Execute the SQL query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Return the query results as JSON
      res.json(results);
    });
      }
  );
 
  //get 
  app.get('/api/flightbill', (req, res) => {

   // Construct the SQL query with the variable
   const query = `SELECT
   C.Username AS CustomerName,
   F.Ftime AS FlightTime,
   F.Fdate AS FlightDate,
   F.Fid AS FlightID,
   F.Destination AS FlightDestination,
   SUM(S.Price) AS SumPrice,
   S.Sid AS SeatID,
   S.snumber AS SeatNumber,
   S.Status AS SeatStatus
FROM
   Customer AS C
   JOIN Booking AS B ON C.Username = B.Username
   JOIN Seat AS S ON B.Bid = 2 AND B.Bid = S.Bid
   JOIN Flight AS F ON S.Fid = F.Fid
GROUP BY
   C.Username, F.Ftime, F.Fdate, F.Fid, F.Destination, S.Sid, S.snumber, S.Status `;

    // Execute the SQL query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Return the query results as JSON
      res.json(results);
    });
      }
  );


app.post('/reserve-seat', jsonParser, function (req, res) {
  const { seatNumber, customerId } = req.body;
  connection.query(
    'UPDATE seat SET status = ?  WHERE snumber = ?',
    [true,  seatNumber],
    function (error, results, fields) {
      if (error) throw error;
      res.json({ status: 'ok', message: 'Seat reserved successfully' });
    }
  );
});

app.get('/check-seat', function(req, res){
  connection.query('SELECT status FROM seat WHERE Fid = 1', function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results); 
  });
});


app.get('/quantity-admin', (req, res) => {
  connection.query('SELECT * FROM admin', (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})



app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})