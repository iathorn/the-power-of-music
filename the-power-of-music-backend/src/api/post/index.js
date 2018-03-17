const express = require('express');
const postCtrl = require('./post.ctrl');
const router = express.Router();

const path = require('path');
const uploadDir = path.join(__dirname, '../../uploads');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, 'uploads-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }    
});
const upload = multer({storage: storage});


router.get('/', postCtrl.list);
router.get('/:id', postCtrl.checkObjectId, postCtrl.read);
router.post('/', postCtrl.checkLogin, postCtrl.write);
router.post('/ajax', postCtrl.checkLogin, upload.any(), postCtrl.ajaxUpload);
router.delete('/ajax/:track', postCtrl.checkLogin, postCtrl.ajaxRemove);
router.post('/ajaxCover', postCtrl.checkLogin, upload.any(), postCtrl.ajaxCoverUpload);
router.delete('/ajaxCover/:cover', postCtrl.checkLogin, postCtrl.ajaxCoverRemove);
router.patch('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.update);
router.delete('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.remove);
router.post('/removeAjaxCover/:cover', postCtrl.removeAjaxCover);

module.exports = router;