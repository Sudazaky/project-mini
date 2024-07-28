const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../../controller/admin/setting.controller.js');

const upload = multer();
const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');

router.get("/general", controller.general);

router.patch("/general", upload.single("logo"), uploadCloud.upload, controller.generalPatch);

module.exports = router;