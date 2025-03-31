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
  const { number, items, status, totalSum } = req.body; 

  const query = 'INSERT INTO tables (number, status, totalSum) VALUES (?, ?, ?)';
  
  db.query(query, [number, status, totalSum], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }

    const tableDataId = result.insertId;

    items.forEach(item => {
      const itemQuery = 'INSERT INTO items (tables_id, name, value, quantity) VALUES (?, ?, ?, ?)';
      db.query(itemQuery, [tableDataId, item.name, item.value, item.quantity], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error inserting item into the items table' });
        }
      });
    });

    res.status(200).json({ message: 'Data submitted successfully' });

  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
