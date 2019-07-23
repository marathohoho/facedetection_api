const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).send("Incorrect form submission");
    }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
    
        console.log("Starting a new transaction")
        return db.connection.transaction(trx => {
            return db.userLogin.create({
                email: email,
                hash: hash
            }, {transaction: trx})
            .then((loginEmail) => {
                return db.users.create({
                    name: name,
                    email: loginEmail.dataValues.email,
                    joined: new Date()
                    }, {transaction: trx})
                    .then(user => {
                        res.json(user);
                    })
                    .catch(error => {
                        res.status(400).json("unable to register");
                    })
            })
        })
};

module.exports = {
    handleRegister: handleRegister
};