const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginalUrl } = require('../controllers/urlController');

// Route to shorten URL
router.post('/shorten', shortenUrl);

// Route to handle redirection
router.get('/:shortCode', redirectToOriginalUrl);

module.exports = router;
