const db = require("../../configs/database")

module.exports = async (query, start, limit) => {
  const { search, sort } = query

  let sql = "SELECT * FROM goods "

  if (search !== '' && search) {
    sql += `WHERE name LIKE '%${search}%' `
  }

  if (sort && parseInt(sort)) {
    sql += `ORDER BY id DESC `
  } else {
    sql += `ORDER BY id ASC `
  }

  sql += 'LIMIT ?, ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [start, limit], (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      if (res.length < 1) reject(new Error("Goods data empty"));
      else resolve(res);
    })
  })
}