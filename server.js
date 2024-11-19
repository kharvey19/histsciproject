const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./survey.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      q1 TEXT,
      q2 TEXT,
      q3 TEXT,
      q4 TEXT,
      q5 TEXT,
      q6 TEXT,
      q7 TEXT,
      q8 TEXT,
      q9 TEXT,
      q10 TEXT
    )
  `);
});

app.post('/api/survey', (req, res) => {
  const { name, responses } = req.body;
  const values = [name, ...Object.values(responses)];
  db.run(
    `INSERT INTO survey_responses (name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    values,
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error saving responses');
      } else {
        res.send('Responses saved successfully');
      }
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

app.get('/api/survey/last', (req, res) => {
  const query = 'SELECT * FROM survey_responses ORDER BY id DESC LIMIT 1'; // Fetch the last row
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching last survey data');
    } else {
      res.json(row);
    }
  });
});
