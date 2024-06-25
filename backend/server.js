const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const hostname = '127.0.0.1';
const port = 3000;

// SQLite-Datenbank initialisieren
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT,   checked INTEGER, col TEXT)");
});

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    switch (url.pathname) {
      case '/items':
        if (req.method === 'GET') {
          db.all("SELECT * FROM items", (err, rows) => {
            if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Database error' }));
            } else {
              res.writeHead(200);
              res.end(JSON.stringify(rows));
            }
          });
        } else if (req.method === 'POST') {
          const {text, title, col, checked } = JSON.parse(body);
          db.run("INSERT INTO items (text, title, col, checked) VALUES (?, ?, ?, ?)", [text, title, col, checked], function(err) {
            if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Database error' }));
            } else {
              res.writeHead(201);
              res.end(JSON.stringify({  id: this.lastID, text, title, col, checked }));
            }
          });
        }
        break;
      case `/items/${url.pathname.split('/')[2]}`:
        const id = url.pathname.split('/')[2];
        if (req.method === 'PUT') {
          const { text, title, col, checked } = JSON.parse(body);
          db.run("UPDATE items SET title= ?, text = ?, col = ?, checked = ? WHERE id = ?", [title, text,  col, checked, id], function(err) {
            if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Database error' }));
            } else {
              res.writeHead(200);
              res.end(JSON.stringify({  id, text, title, col, checked }));
            }
          });
        } else if (req.method === 'DELETE') {
          db.run("DELETE FROM items WHERE id = ?", [id], function(err) {
            if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Database error' }));
            } else {
              res.writeHead(204);
              res.end();
            }
          });
        }
        break;
      default:
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  });
});

// db.run("DELETE FROM items", function(err) {
//   if(err){
//       console.log(err)
//   }
//   else{
//       console.log("Successful");
//   }
//   db.close();
// });


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("DB:"+db);
});
