// routes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/model');

// Route to get all tasks
router.get('/getalldata', async (req, res) => {
    try {

        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
