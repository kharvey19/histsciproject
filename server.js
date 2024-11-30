const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://limitless-earth-51296-7806e27eec8d.herokuapp.com',
}));

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
      q10 TEXT,
      q11 TEXT,
      q12 TEXT,
      q13 TEXT,
      q14 TEXT,
      q15 TEXT,
      q16 TEXT,
      q17 TEXT,
      q18 TEXT,
      q19 TEXT,
      q20 TEXT,
      q21 TEXT,
      q22 TEXT,
      q23 TEXT,
      q24 TEXT,
      q25 TEXT
    )
  `);
});

app.post('/api/survey', (req, res) => {
  const { name, responses } = req.body;

  const values = [name, ...Object.values(responses)];
  db.run(
    `INSERT INTO survey_responses(name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, 
                                         q11, q12, q13, q14, q15, q16, q17, q18, q19, q20,
                                         q21, q22, q23, q24, q25)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
  const query = 'SELECT * FROM survey_responses ORDER BY id DESC LIMIT 1';
  db.get(query, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching last survey data');
    } else {
      console.log('Server Data:', row); // Log the fetched row
      res.json(row || {}); // Send an empty object if no data
    }
  });
});

// // Start the server
// const PORT = process.env.PORT || 5000; // Use Railway's assigned port or default to 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
