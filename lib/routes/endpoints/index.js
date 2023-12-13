const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/hello-world', require('./tts-hello-world'));
router.use('/dial-time', require('./dial-time'));

module.exports = router;
