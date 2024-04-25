// server.js
const express = require("express");
const mysql = require('mysql');
const cors = require ('cors');
const app = express ();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "issatsio" // Assurez-vous que le nom de la base de données est correct
})

db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return;
    }
    console.log('Connexion à la base de données MySQL réussie');
});
  
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM login WHERE email=? AND password=?';
  
    db.query(sql, [email, password], (err, data) => {
      if (err) {
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      if (data.length > 0) {
        return res.status(200).json({ message: 'Connexion réussie' });
      } else {
        return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
    });
});

app.post('/register', (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;
  const sql = 'INSERT INTO login (fullName,  email,tel, password) VALUES (?, ?, ?, ?)';

  db.query(sql, [fullName,  email,phoneNumber, password], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    console.log('Nouvel utilisateur inséré avec succès');
    return res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
  });
});


  
const PORT = process.env.PORT || 8083; // Changer le port de 8081 à 8082
app.listen(PORT, () => {
    console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
