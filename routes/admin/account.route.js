const express = require('express');
const router = express.Router();

const validate = require('../../validates/admin/account.validate.js');

const multer  = require('multer');
const upload = multer();
const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');

const controller = require('../../controller/admin/account.controller.js');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single("avatar"), uploadCloud.upload, validate.createPost, controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single("avatar"), uploadCloud.upload, validate.editPatch, controller.editPatch);


module.exports = router;