//request = represents any data sent by the user to the api
//response = allows us to respond to the user with specific data
//send = sends back the data as a result of the request
// ./ =  current directory
// module.exports = exposes whatever you want as a module itself which allows other files to require and work with it
// body parser takes care of setting up middleware in express
// middleware allows us to parse json data
// "find" returns a reference, not the original

const { Router } = require("express");

const pool = require("../db");

const router = Router();

// const usersController = require('../controllers/userscontroller');
// router.get("/", usersController.getUsers);

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, res) => {
    if (err) return next(err); //next(err) passes error to error handler
    // next = handles setting data around through middleware
    response.json(res.rows); // res.rows gives you shorter amount of data instead of using only res
    //response.json renders the rows
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
router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM users WHERE id=($1)', [id], (err, res) => {
    if(err) return next(err);

    response.redirect('/users');

  });
});

module.exports = router;
