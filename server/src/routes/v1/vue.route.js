const express = require('express');

const router = express.Router();

router.get('/', () => {
  res.sendFile(path + 'all.html');
});

module.exports = router;
