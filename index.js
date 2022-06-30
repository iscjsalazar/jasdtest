const express = require('express');
const path = require('path');


const port = 3000;
const app = express();
const router = express.Router();


class MoviesNoParamsError extends Error { 
    constructor() {
        super("Id param not found");
    }
};


router.route('/movies').get(
    (req, res, next) => { 
        if (req.query['id'])
            next();
        throw new MoviesNoParamsError();
     },
    (req, res) => { 
        res.status(200).send( {data:"x", idParam: req.query["id"]} );
    }
);

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname+'/routes.html'));
});

app.use(router);


app.use(
    (err, req, res, next) => {
        console.log(err);
        res.status(400).send(err.message);
    } 
);

app.use(
    (req, res, next) => {
        res.redirect('/error');
    } 
);

const server = app.listen(port, () => console.log("running"));