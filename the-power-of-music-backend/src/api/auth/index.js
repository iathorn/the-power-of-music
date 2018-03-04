const express = require('express');
const authCtrl = require('./auth.ctrl');
const router = express.Router();

router.post('/login', authCtrl.login);
router.post('/login/admin', authCtrl.adminLogin);
router.post('/logout', authCtrl.logout);
router.post('/logout/admin', authCtrl.adminLogout);

router.get('/check', authCtrl.checkLogin);
router.get('/check/admin', authCtrl.checkLoginAdmin);

router.post('/signup', authCtrl.signup);

module.exports = router;