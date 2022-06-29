const { Router} = require('express');
const router = Router();

const User = require('../models/User');

router.post('/signup', (req, res) => {
    const {username, email,password} = req.body;
    const user = new User ({
        username: username,
        email: email,
        password: password
    })
    console.log(user);
    res.json({message: 'User created'});
});


module.exports = router;