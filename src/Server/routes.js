import express from 'express';
import cors from 'cors';

import DB from './db/index';

const router = express();

router.use(cors({
    origin: "http://localhost:3000"
}));
router.use(express.json());

router.get('/randomthisorthat', async (req, res) => {
    try {
        let results = await DB.functions.getRandomThisOrThat();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/updatethisorthat', (req, res) => {
    try {
        console.log(req.body.votes_opt_1);
        console.log(req.body.votes_opt_2);
        
        DB.functions.updateValue(req.body.votes_opt_1, req.body.votes_opt_2, req.body.id);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;