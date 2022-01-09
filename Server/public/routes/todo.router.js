const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();

//GET

taskRouter.get('/', (req, res ) => {
    const queryText = 'SELECT * FROM "checklist";';

    // tell database to select all tasks
    pool.query(queryText)
        .then((dbRes) => {
            console.log(dbRes.rows);
            // send data back to the client
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('GET failed!', err);
            res.sendStatus(500);
        });
});

//POST
taskRouter.post('/', (req, res) =>{
    console.log('sent:', req.body);
    let queryText = `
    INSERT INTO "checklist"
    ("task")
    VALUES
    ($1);
    
    `;

    pool.queryParams = [
        req.body.task
    ];

    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('POST failed', error);
        res.sendStatus(500);
    });
});

//PUT

taskRouter.put('/:taskId', (req, res) => {
    console.log('in PUT', req.body);

    let queryText = `
        UPDATE "checklist"
        SET "completed" = $1
        WHERE "id" = $2;
    `;

    let queryParams = [
        req.body.completed,
        req.params.taskId
    ];

    console.log('update:', queryParams);

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('PUT failed');
            res.sendStatus(500);
        });
});


// DELETE
taskRouter.delete('/:taskId', (req, res) => {
    console.log('in DELETE');
    console.log('task id:', req.params.taskId);

    let queryText = `
        DELETE FROM "checklist"
        WHERE id = $1;
    `;

    let queryParams = [req.params.taskId];

    pool.query(queryText, queryParams)
        .then((dbRes) => {
        
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('DELETE failed');
        
            res.sendStatus(500);
        });
});

    



module.exports = taskRouter;