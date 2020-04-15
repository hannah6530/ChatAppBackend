// exports.getUsers = (request, response, next) => {
//     pool.query("SELECT * FROM users ORDER BY id ASC", (err, res) => {
//       if (err) return next(err);
//       response.json(res.rows);
//     });
//   }