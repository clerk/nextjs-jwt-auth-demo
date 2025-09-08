// scripts/setupDatabase.js
import sqlite3 from 'sqlite3'
import path from 'path'

sqlite3.verbose()

const db = new sqlite3.Database(path.join(process.cwd(), 'database.sqlite'));

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT)');
});

db.close();
