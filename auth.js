const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');



router.post('/register', async (req,res) => {

    //LET VALIDATE THE DATA BEFORE WE ADD USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if the user existe
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exist');
    
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{//Save into DB
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;