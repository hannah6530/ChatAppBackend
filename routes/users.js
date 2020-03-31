const {
    Router
} = require('express');

const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});


router.get('/:id', (request, response, next) => {
    const {
        id
    } = request.params;

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {
    const {
        first_name,
        last_name,
        user_name,
        password,
        email_address
    } = request.body;
    pool.query('INSERT INTO users(first_name, last_name, user_name, password, email_address) VALUES($1, $2, $3, $4, $5)',
        [first_name, last_name, user_name, password, email_address],
        (err, res) => {
            if (err) return next(err);
            response.redirect('/users');
        }
    );
});

router.put('/:id', (request, response, next) => {
    const {
        id
    } = request.params;

    const {
        first_name,
        last_name,
        user_name,
        password,
        email_address
    } = request.body;

    pool.query(
        'UPDATE users SET first_name=($1), last_name=($2), user_name=($3), password=($4), email_address=($5) WHERE id=($6)',
        [first_name, last_name, user_name, password, email_address, id],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/users');
        }
    )
});

module.exports = router;