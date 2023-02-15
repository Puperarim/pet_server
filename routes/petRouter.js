const Router = require("express");
const petController = require("../controllers/petController");

const router = new Router();

router.post("/", petController.create);
router.get("/", petController.getAll);
router.get("/:id", petController.getOne);

module.exports = router;