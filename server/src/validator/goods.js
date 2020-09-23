const validator = require("validator")
const { throw: throwValidator, safeString } = require("./validator")
const goodsExists = require("../models/goods/goodsExists")

const numberRegex = new RegExp("^[0-9]*$")

module.exports = {
  create: async (req) => {

    const name = safeString(req.name)
    const purchase = safeString(req.purchase_price)
    const selling = safeString(req.selling_price)

    if (
      validator.isEmpty(name) ||
      validator.isEmpty(purchase) ||
      validator.isEmpty(selling)
    ) return throwValidator(false, "Form need to be filled")

    if (!(numberRegex.test(purchase) && numberRegex.test(selling))) return throwValidator(false, "Price should be in number")
    if (!(parseInt(purchase) > 1000 && parseInt(selling) > 1000)) return throwValidator(false, "Price invalid, should be more than a thousand")

    else {
      return throwValidator(true, "Goods created", {
        name,
        purchase_price: purchase,
        selling_price: selling
      })
    }
  },
  update: async (params, body) => {
    const { id } = params
    for (let key in body) {
      if (!body[key] && body[key] === '') {
        delete body[key]
      }
      else {
        switch (key) {
          case "purchase_price":
          case "selling_price":
            if (!numberRegex.test(body[key])) return throwValidator(false, "Price should be in number")
            else if (!(parseInt(body[key]) > 1000)) return throwValidator(false, "Price Invalid")
            break
          case "stock":
            if (!numberRegex.test(body[key])) return throwValidator(false, "Stock should be in number")
            break
          default:
            break
        }
      }
    }
    if (Object.keys(body).length < 1) return throwValidator(false, "Updated Data Empty")
    else {
      const isExists = await goodsExists({ id: parseInt(id) })
      if (!isExists) return throwValidator(false, `Goods id:${id} doesn't exist`)
      else return throwValidator(true, `Goods id:${id} Updated Successfully`, { id: parseInt(id), updatedData: body })
    }
  },
  delete: async (req) => {
    const { id } = req
    const isExists = await goodsExists({ id: parseInt(id) })
    if (!isExists) return throwValidator(false, `Goods id:${id} doesn't exist`)
    else return throwValidator(true, `Goods id:${id} Deleted Successfully`, { id: parseInt(id) })
  }
}