const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");
const cors=require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Create a new SQLite database
const db = new sqlite3.Database('./promise_tracker.db');



// Create promises table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS promises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        promise TEXT NOT NULL,
        context TEXT,
        promised_on DATE NOT NULL,
        to_be_completed_date DATE NOT NULL,
        category TEXT,
        completed BOOLEAN NOT NULL
      );
    )`);
});


// GET route to fetch all promises
app.get('/api/promises', (req, res) => {
    // Fetch all promises from the database
    const sql = `SELECT * FROM promises`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error fetching promises:', err.message);
        return res.status(500).json({ error: 'Failed to fetch promises' });
      }
      console.log(rows)
      res.json(rows);
    });
  });
  
  // POST route to add a new promise
  app.post('/api/promises', (req, res) => {
    const { name, promise, context, promisedOn, toBeCompletedDate, category, completed } = req.body;
    
    if (!name || !promise || !context || !promisedOn || !toBeCompletedDate || !category || completed === undefined) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    // Insert promise data into the promises table
    const sql = `INSERT INTO promises (name, promise, context, promised_on, to_be_completed_date, category, completed)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, promise, context, promisedOn, toBeCompletedDate, category, completed];
  
    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error adding promise:', err.message);
        return res.status(500).json({ error: 'Failed to add promise' });
      }
  
      res.json({ message:'Added successfully' });
    });
  });
  
  // DELETE route to delete a promise by ID
  app.delete('/api/promises/:id', (req, res) => {
    const { id } = req.params;
  
     // Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    // Delete the promise with the given ID from the database
    const sql = `DELETE FROM promises WHERE id = ?`;
  
    db.run(sql, id, function(err) {
      if (err) {
        console.error('Error deleting promise:', err.message);
        return res.status(500).json({ error: 'Failed to delete promise' });
      }
  
      // Check if any rows were affected
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Promise not found' });
      }
  
      res.json({ message: 'Promise deleted successfully' });
    });
  });

  // GET route to fetch a promise by ID
app.get('/api/promises/:id', (req, res) => {
    const { id } = req.params;

     // Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

  
    // Fetch the promise with the given ID from the database
    const sql = `SELECT * FROM promises WHERE id = ?`;
  
    db.get(sql, id, (err, row) => {
      if (err) {
        console.error('Error fetching promise:', err.message);
        return res.status(500).json({ error: 'Failed to fetch promise' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Promise not found' });
      }
      res.json(row);
    });
  });
  
  // PUT route to update a promise by ID
  app.put('/api/promises/:id', (req, res) => {
    const { id } = req.params;
    const { name, promise, context, promised_on, to_be_completed_date, category, completed } = req.body;
    
     // Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

     // Validate inputs
     if (!name || !promise || !promised_on || !to_be_completed_date || completed === undefined  || !context || !category) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Update the promise with the given ID in the database
    const sql = `UPDATE promises
                 SET name = ?, promise = ?, context = ?, promised_on = ?, to_be_completed_date = ?, category = ?, completed = ?
                 WHERE id = ?`;
    const values = [name, promise, context, promised_on, to_be_completed_date, category, completed, id];
  
    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error updating promise:', err.message);
        return res.status(500).json({ error: 'Failed to update promise' });
      }
  
      // Check if any rows were affected
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Promise not found' });
      }
  
      res.json({ message: 'Promise updated successfully' });
    });
  });

  // GET route to fetch stats
app.get('/api/stats', (req, res) => {
    const sql = `SELECT name, 
                        COUNT(*) AS totalPromises, 
                        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) AS fulfilledPromises,
                        SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) AS unfulfilledPromises
                 FROM promises
                 GROUP BY name`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error fetching stats:', err.message);
        return res.status(500).json({ error: 'Failed to fetch stats' });
      }
      res.json(rows);
    });
  });
  
  
  // Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
