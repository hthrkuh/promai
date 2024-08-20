const express = require("express");
const {
    getTrendingGIFs,
    searchGIFs
} = require("../controllers/giphyController");

const router = express.Router();

/**
 * @swagger
 * /api/giphy/trending:
 *   get:
 *     summary: Get trending GIFs
 *     description: Retrieve a list of trending GIFs
 *     responses:
 *       200:
 *         description: A list of trending GIFs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       images:
 *                         type: object
 *                         properties:
 *                           fixed_height:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *       500:
 *         description: Server error
 */
router.get("/trending", getTrendingGIFs);

/**
 * @swagger
 * /api/giphy/search:
 *   get:
 *     summary: Search GIFs
 *     description: Search for GIFs based on a query parameter
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Search query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       images:
 *                         type: object
 *                         properties:
 *                           fixed_height:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *       500:
 *         description: Server error
 */
router.get("/search", searchGIFs);

module.exports = router;
