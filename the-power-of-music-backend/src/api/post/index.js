const express = require('express');
const postCtrl = require('./post.ctrl');
const router = express.Router();

router.get('/', postCtrl.list);
router.get('/:id', postCtrl.checkObjectId, postCtrl.read);
router.post('/', postCtrl.write);
router.patch('/:id', postCtrl.checkObjectId, postCtrl.update);
router.delete('/:id', postCtrl.checkObjectId, postCtrl.remove);

module.exports = router;