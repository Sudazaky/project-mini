const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/product.controller');
const validate = require('../../validates/admin/product.validate');

// Multer
const multer  = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter()});
// End Multer

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.patch('/restore/:id', controller.restoreItem);

router.get('/create', controller.createItem);

// Multer
router.post('/create', upload.single('thumbnail'), validate.createPost, controller.createItemPost);
// End Multer

router.get('/edit/:id', controller.editItem);

router.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, controller.editItemPatch);

router.get('/detail/:id', controller.detailItem);

module.exports = router;