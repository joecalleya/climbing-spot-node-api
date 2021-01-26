import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {
    getCollectionDocuments,
    createCollectionDocument,
    deleteCollectionDocument
} from './database.js';

const app = express();
app.use(cors());
app.use(bodyParser.json())
// GET endpoint which returns/sends all our locations in the response
app.get('/', async (request, response) => {
    const locations = await getCollectionDocuments('locations')
    response.send(locations);
})

// POST endpoint which takes the LOCATION from the request body and saves it...
app.post('/create', async (request, response) => {
    const newLocations = request.body;
    await createCollectionDocument('locations', newLocations);
    response.send({
        message: "We created this location...."
    })
})

// DELETE endpoint which deletes the user which is sent in the request body...
app.delete('/delete', async (request, response) => {
    const locationsToDelete = request.body;
    console.log(locationsToDelete)
    await deleteCollectionDocument('locations', locationsToDelete);
    response.send({
        message: "We deleted this location...."
    })
});
// Finally! Listen on Port 8080
app.listen(8080);