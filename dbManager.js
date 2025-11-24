const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

// Se não existir, cria automaticamente
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));
}

let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function saveDB() {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function getUser(userId) {
    if (!db[userId]) db[userId] = { money: 0, bank: 0 };
    return db[userId];
}

module.exports = { db, saveDB, getUser };
