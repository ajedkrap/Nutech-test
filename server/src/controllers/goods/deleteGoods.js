const response = require("../../helper/response")
const validator = require("../../validator/goods")
const deleteGoods = require("../../models/goods/deleteGoods")

module.exports = async (req, res) => {
  const { status, message, passed } = await validator.delete(req.params)
  if (!status) {
    res.status(404).send(response(status, message))
  } else {
    try {
      await deleteGoods(passed)
      res.status(202).send(response(status, message))
    } catch (e) {
      res.status(500).send(response(false, e.message))
    }
  }
}