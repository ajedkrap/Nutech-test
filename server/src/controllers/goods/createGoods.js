const response = require("../../helper/response")
const multer = require('multer')
const upload = require("../../utils/multer-goods")
const validator = require("../../validator/goods")
const createGood = require("../../models/goods/createGoods")

module.exports = async (req, res) => {
  upload(req, res, async (fileError) => {
    if (fileError instanceof multer.MulterError) {
      res.status(400).send(response(false, fileError.message))
    }
    else if (fileError) {
      res.status(400).send(response(false, fileError.message))
    }
    else if (!req.file) {
      res.status(400).send(response(false, "File empty"))
    }
    else {
      const { status, message, passed } = await validator.create(req.body)
      if (!status) {
        res.status(400).send(response(status, message))
      }
      try {
        const createdGoods = await createGood({
          ...passed,
          picture: "picture/" + req.file.filename
        })
        res.status(201).send(response(status, message, createdGoods))
      } catch (e) {
        res.status(500).send(response(false, e.message))
      }
    }
  })

}