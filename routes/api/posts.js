const express = require('express');
const router = express.Router();
const postsCtrl = require('multer')
const multer = require('multer')
const upload = multer();

router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)

module.exports = router;