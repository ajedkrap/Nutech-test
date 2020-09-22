const router = require("express").Router()
const getAllGoods = require("../controllers/goods/getAllGoods")
const createGoods = require("../controllers/goods/createGoods")
const updateGoods = require("../controllers/goods/updateGoods")
const deleteGoods = require("../controllers/goods/deleteGoods")

router.get("/", getAllGoods)
router.post("/", createGoods)
router.patch("/:id", updateGoods)
router.delete("/:id", deleteGoods)

module.exports = router