const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).send("Please, enter both email and password");
    }
    db.users.findOne({where: {email}})
        .then(user => {
        // need to add here as well
            db.userLogin.findOne({where: {email: user.email}})
                .then(loginFound => {
                    // compare the unhashed password with the password
                    if (bcrypt.compareSync(password, loginFound.hash)){
                        res.json(user);
                        console.log("success loggin in");
                    }
                    else
                        res.status(400).json("Failure to log in")
                })
                
        })
        .catch(()=>{res.json("Account with such email was not found")})

}

module.exports = {
    handleSignin
}