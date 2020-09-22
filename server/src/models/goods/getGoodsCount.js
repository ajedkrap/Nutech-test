const db = require("../../configs/database")

module.exports = async (query) => {
  const { search } = query

  let sql = "SELECT COUNT(*) as count FROM goods "

  if (search && search !== '') {
    sql += `WHERE name LIKE '%${search}%' `
  }

  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      if (res[0].count < 1) reject(new Error("Goods data Empty"));
      else resolve(res[0].count);
    });
  });
}