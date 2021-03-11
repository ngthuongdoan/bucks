const express = require('express');

const router = express.Router();

router.get('/', () => {
  res.sendFile(path + 'index.html');
});

module.exports = router;
