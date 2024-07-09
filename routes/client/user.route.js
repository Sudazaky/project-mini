const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/user.controller');

const userValidate = require('../../validates/client/user.validate');

router.get('/register', controller.register);

router.post('/register', userValidate.user, controller.registerPost);

router.get('/login', controller.login);

router.post('/login', userValidate.user, controller.loginPost);

router.get('/logout', controller.logout);

router.get('/password/forgot', controller.forgotPassword);

router.post('/password/forgot', controller.forgotPasswordPost);

router.get('/password/otp', controller.otp);

router.post('/password/otp', controller.otpPost);

router.get('/password/reset', controller.reset);

router.post('/password/reset', userValidate.userConfirmPassword, controller.resetPost);

module.exports = router;