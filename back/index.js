const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const dotenv = require('dotenv')

const apartments = require('./apartment_list.json')

dotenv.config()

const app = express()
app.use(cors())

app.get('/api', (req, res) => {
  pgClient.query('SELECT * FROM apartments', (error, result) => {
    if (error) {
      console.log('problem: ', error)
    }
    console.log(result.rows[0])
    if (result.rows[0]) {
      res.json({ message: result.rows })
    }
  })
})

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

pgClient.on('connect', (client) => {
  client
    .query(
      'CREATE TABLE IF NOT EXISTS apartments (apartment_ID SERIAL PRIMARY KEY,name varchar(90) NOT NULL, img varchar(120) NOT NULL);'
    )
    .catch((err) => console.log(err))
})

pgClient.query(
  'SELECT EXISTS(SELECT (name, img) FROM apartments)',
  (error, result) => {
    if (error) {
      console.log('problem: ', error)
    }
    console.log('Data in table: ', result.rows[0].exists)
    if (!result.rows[0].exists) {
      apartments.map((apartment) => {
        pgClient.query('INSERT INTO apartments (name, img) VALUES ($1, $2)', [
          apartment.name,
          apartment.photo,
        ])
      })
    }
  }
)
app.listen(5000, (err) => {
  console.log('Listening')
})
