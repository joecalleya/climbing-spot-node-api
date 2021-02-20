import pkg from 'pg';
const {Pool} = pkg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shares',
  password: 'sherlock1',
  port: 5432
})

  export const getTableData = (queryText) => {

    const query = {
      text: `${queryText}`
    }

    return new Promise(function(resolve, reject){
      pool.connect((err, client, done) => {
        if (err) throw err
        client.query(queryText, (err, result) => {
          done()
          if(err)
          return reject(err);
            resolve(result.rows);
        })
      })
    });

  }


  