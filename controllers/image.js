const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9c1782e66ed240f187e280ef6f5357f5' //add api here
   });

const handleApiUrl = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(400).send(err);
    })
}

const handleImage = (req, res, db) => {
    const { id } = req.params;

    db.users.findOne({where : {id}})
        .then((item)=>{
            if (item){
                item.update({
                    entries: item.entries + 1
                })
                .then(res.json(item))
            } else {
                res.status(400).json("Item was not found by this ID")            }
        })
        .catch(err => res.json("Item was not found by this ID"))

}

module.exports = {
    handleImage,
    handleApiUrl
}