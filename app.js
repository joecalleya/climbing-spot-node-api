import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {
  getTableData
} from './database.js';
import {financialsSummaryQuery, newsQuery, timeSeriesQuery, cashSummaryQuery, cashDetailQuery, financialsDetailQuery} from './queries.js'

const app = express();
app.use(cors());
app.use(bodyParser.json())

// GET endpoint which returns/sends all our locations in the response
app.get('/:dataset/:condition/:groupBy/', async (request, response) => {
  const dataset = request.params['dataset']
  const condition = request.params['condition']
  console.log(dataset,condition)  
  const groupBy = request.params['groupBy']

    if (dataset == 'FINANCIALSDETAIL')
    {
      getTableData(financialsDetailQuery(`${condition}`))
      .then(function (result) {
        console.log("rows: ",result.length)
        response.send(result)
      }).catch(function (err) {
        console.log(err)
      });
    }
    else if (dataset == 'FINANCIALSSUM')
    {
      getTableData(financialsSummaryQuery(`${condition}`,`${groupBy}`))
      .then(function (result) {
        console.log("rows: ",result.length)
        response.send(result)
      }).catch(function (err) {
        console.log(err)
      });
    }
    else if (dataset == 'NEWS')
    {
      getTableData(newsQuery(`${condition}`))
      .then(function (result) {
        response.send(result)

      }).catch(function (err) {
        console.log(err);
      })
    }
    else if (dataset == 'TIMESERIES')
    {
      //console.log(timeSeriesQuery(`${condition}`,`${groupBy}`))

      getTableData(timeSeriesQuery(`${condition}`,`${groupBy}`))
      .then(function (result) {
        console.log("rows: ",result.length)
        response.send(result)
      }).catch(function (err) {
        console.log(err)
      });
    }
    else if (dataset == 'CASHSUM')
    {
      getTableData(cashSummaryQuery(`${condition}`,`${groupBy}`))
      .then(function (result) {
        console.log("rows: ",result.length)
        response.send(result)
      }).catch(function (err) {
        console.log(err)
      });
    }
    else if (dataset == 'CASHDETAIL')
    {
      getTableData(cashDetailQuery(`${condition}`))
      .then(function (result) {
        console.log("rows: ",result.length)
        response.send(result)
      }).catch(function (err) {
        console.log(err)
      });
    }
})

app.listen(8081, "192.168.1.18");