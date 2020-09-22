const db = require("../../configs/database")

module.exports = async (data) => {
  const sql = "DELETE FROM goods WHERE ?"
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, res) => {
      if (err) reject(new Error("Delete Goods Error"))
      else if (res.affectedRows < 1) reject(new (Error("Delete Goods Error")))
      else resolve(true)
    })
  })
}