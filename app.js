import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {
  getTableData
} from './database.js';
import {financialsQuery, newsQuery,timeSeriesQuery} from './queries.js'

const app = express();
app.use(cors());
app.use(bodyParser.json())

// GET endpoint which returns/sends all our locations in the response
app.get('/:dataset/:condition', async (request, response) => {
  const dataset = request.params['dataset']
  const condition = request.params['condition']
  console.log(dataset,condition)

    if (dataset == 'FINANCIALS')
    {
      const result = getTableData(financialsQuery(`${condition}`))
      .then(function (result) {
        response.send(result)
        console.log(result.length,dataset)
      }).catch(function (err) {
        console.log(err)
      });
    }
    else if (dataset == 'NEWS')
    {
      const result = getTableData(newsQuery, '')
      .then(function (result) {
        response.send(result)
        console.log(result.length,dataset)
      }).catch(function (err) {
        console.log(err);
      })
    }
    else if (dataset == 'TIMESERIES')
    {
      const result = getTableData(timeSeriesQuery(`${condition}`))
      .then(function (result) {
        response.send(result)
        console.log(result.length,dataset)
      }).catch(function (err) {
        console.log(err)
      });
    }
})


app.listen(8080);