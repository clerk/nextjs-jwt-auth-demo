// lib/db.js
import sqlite3 from 'sqlite3'
import path from 'path'

sqlite3.verbose()

const db = new sqlite3.Database(path.join(process.cwd(), 'sqlite.db'), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT)');
});

export { db }