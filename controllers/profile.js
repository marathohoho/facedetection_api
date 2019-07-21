const handleProfile = (req, res, db) => {
    const { id } = req.params
    db.users.findOne({where: {id}})
        .then(user => {
            if(user.length != 0)
                res.json(user)
            else
                res.status(400).json("User is not found")
        })
        .catch(err => res.status(400).json("Error retrieving the user"))
}

module.exports = {
    handleProfile
}