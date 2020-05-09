import express from 'express';
import router from './routes'

const app = express();

app.use('/', router);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});