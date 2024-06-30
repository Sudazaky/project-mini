const express = require('express');
const router = express.Router();
const multer = require('multer');

const controller = require('../../controller/admin/product-category.controller');
const upload = multer();
const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');
const validate = require('../../validates/admin/product-category.validate');

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.editPatch);

router.delete("/delete/:id", controller.delete);

router.patch("/change-status/:status/:id", controller.changeStatus);

module.exports = router;