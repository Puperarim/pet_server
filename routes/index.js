const Router = require('express');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const petRouter = require('./petRouter');
const basketRouter = require('./basketRouter')

const router = new Router();

router.use("/user", userRouter);
router.use("/basket", basketRouter);
router.use("/pet", petRouter);
router.use("/category", categoryRouter);

module.exports = router;