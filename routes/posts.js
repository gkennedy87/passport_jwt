const router = require('express').Router();
const privatize = require('./privateRoute');
router.get('/', privatize, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'Data you shouldn\'t access'
    }})
})

module.exports = router;