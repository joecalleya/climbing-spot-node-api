import pkg from 'pg';
const { Pool, Client } = pkg


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'shares',
  password: 'sherlock1',
  port: 5432
})
client.connect()

client.query('SELECT * from watchlist', (err, res) => {
  console.log(err, res)
  client.end()
})