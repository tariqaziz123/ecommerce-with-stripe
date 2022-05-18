const {Router} = require('express');
const orderControllers = require('../controllers/orderControllers');
const router = Router();

router.get('/order/:id', orderControllers.get_orders);
router.post('/order/:id', orderControllers.checkout);

module.exports = router;
