const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'till',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM tables';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/data', (req, res) => {
  const { number, totalSum } = req.body; 

  const query = 'INSERT INTO tables (number, totalSum) VALUES (?, ?)';
  
  db.query(query, [number, totalSum], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Data inserted successfully!', id: results.insertId });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
