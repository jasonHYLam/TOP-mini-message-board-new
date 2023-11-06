var express = require('express');
var router = express.Router();
const message_controller = require("../controllers/messages");

/* GET home page. */
router.get('/', message_controller.messages_get);

// GET form page.
router.get('/new', message_controller.form_get);

// POST form page.
router.post('/new', message_controller.form_post);


module.exports = router;