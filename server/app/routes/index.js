'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/query', require('./query'));

router.use('/scraper', require('./scraper'));

router.use(function (req, res) {
    res.status(404).end();
});