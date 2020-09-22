const db = require("../../configs/database")

module.exports = async (data) => {
  const { id, updatedData } = data
  const sql = "UPDATE goods SET ? WHERE ?"
  return new Promise((resolve, reject) => {
    db.query(sql, [{ ...updatedData }, { id }], (err, res) => {
      if (err) reject(new Error("Update Goods Error"))
      else if (res.affectedRows < 1) reject(new (Error("Database Error")))
      else resolve({ id, ...updatedData })
    })
  })
}