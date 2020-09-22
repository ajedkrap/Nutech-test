const response = require("../../helper/response")
const goodsModel = require("../../models/goods/getAllGoods")
const goodsCountModel = require("../../models/goods/getGoodsCount")
const pagination = require("../../utils/pagination")

module.exports = async (req, res) => {
  try {
    const { result, msg, pageInfo } = await pagination(
      req.query,
      goodsModel,
      goodsCountModel,
      "goods"
    )
    res.status(200).send(response(true, msg, result, pageInfo))
  } catch (e) {
    res.status(500).send(response(false, e.message))
  }
}