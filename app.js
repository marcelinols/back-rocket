const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// mysql connection
const db = mysql.createConnection({
    host: 'data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
    user: 'testing',
    password: 'Pruebas%ALI%2020',
    database: 'testing_ali_fullstack',
});

// connect to mysql
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// create a new user
app.post('/api/users', (req, res) => {
   
    const {
        name,
        secondName,
        firstName,
        lastName,
        day,
        month,
        year,
        email,
        phone
    }   = req.body;
    const newUser = {
        name,
        secondName,
        firstName,
        lastName,
        day,
        month,
        year,
        email,
        phone
    };
     
    db.query(
        'INSERT INTO users_test_marcelinols SET ?',
        newUser, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Error inserting user' });
            return;
        }

        newUser.id = result.insertId;
        res.status(201).json(newUser);
    });
});


// Get all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users_test_marcelinols', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }

        res.status(200).json(results);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 



