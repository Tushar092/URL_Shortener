const urlModel = require('../models/urlModel');
const shortid = require('shortid');

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
};

const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    // Check base URL validity
    if (!isValidUrl(baseUrl)) {
        return res.status(400).json('Invalid base URL');
    }

    // Create short code
    const shortCode = shortid.generate();

    try {
        // Check if original URL is valid
        if (isValidUrl(originalUrl)) {
            let url = await urlModel.findOne({ originalUrl });

            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${baseUrl}/${shortCode}`;

                url = new Url({
                    originalUrl,
                    shortCode
                });

                await url.save();

                res.json({ originalUrl, shortUrl });
            }
        } else {
            res.status(400).json('Invalid original URL');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const redirectToOriginalUrl = async (req, res) => {
    try {
        const url = await urlModel.findOne({ shortCode: req.params.shortCode });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

module.exports = { shortenUrl, redirectToOriginalUrl };