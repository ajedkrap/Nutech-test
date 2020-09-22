const response = require("../../helper/response")
const multer = require('multer')
const upload = require("../../utils/multer-goods")
const validator = require("../../validator/goods")
const updateGood = require("../../models/goods/updateGoods")

module.exports = (req, res) => {
  upload(req, res, async (fileError) => {
    if (fileError instanceof multer.MulterError) {
      res.status(400).send(response(false, fileError.message))
    }
    else if (fileError) {
      res.status(400).send(response(false, fileError.message))
    }
    else {
      const { status, message, passed } = await validator.update(req.params, req.body)
      if (!status) {
        res.status(400).send(response(status, message))
      } else {
        const { updatedData } = passed
        if (req.file) {
          updatedData.picture = "picture/" + req.file.filename
        }
        try {
          const updatedGood = await updateGood(passed)
          res.status(202).send(response(status, message, updatedGood))
        } catch (e) {
          res.status(500).send(response(false, e.message))
        }
      }
    }
  })
}