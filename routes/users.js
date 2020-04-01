const { Router } = require("express");

const pool = require("../db");

const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const {
    first_name,
    last_name,
    user_name,
    password,
    email_address
  } = request.body;
  pool.query(
    "INSERT INTO users(first_name, last_name, user_name, password, email_address) VALUES($1, $2, $3, $4, $5)",
    [first_name, last_name, user_name, password, email_address],
    (err, res) => {
      if (err) return next(err);
      response.redirect("/users");
    }
  );
});

router.patch('/:id', (request, response, next) => {
  const { id } = request.params;

  const {
    first_name,
    last_name,
    user_name,
    password,
    email_address
  } = request.body;

  const keys = ['first_name', 'last_name', 'user_name', 'password', 'email_address'];

  const fields = [];

  keys.forEach(key => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE users SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);

        if (index === fields.length - 1) response.redirect("/users");
      }
    )
  });
});

module.exports = router;
