const db = require("../../configs/database")

module.exports = async (data) => {
  const { name, purchase_price, selling_price, picture } = data
  const dataToSend = {
    name,
    purchase_price,
    selling_price,
    picture,
    stock: 0
  }
  const sql = `INSERT INTO goods SET ?`
  return new Promise((resolve, reject) => {
    db.query(sql, dataToSend, (err, res) => {
      if (err) reject(new Error("Create Goods Error"))
      else if (res.affectedRows > 0) resolve({
        id: res.insertId,
        ...dataToSend
      })
      else reject(new Error("Database Error"))
    })
  })
}