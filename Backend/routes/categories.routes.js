const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const categoriesCtrl = require('../controllers/categories.controller');

router.post('/', auth, categoriesCtrl.create);
router.get('/', categoriesCtrl.findAll);


module.exports = router;
