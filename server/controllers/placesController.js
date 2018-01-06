let places = [];
let id = 0;

module.exports = {
    create: (req,res) => {
        const { place } = req.body;
        places.push({ id, place })
        if(places.length > 3) {
            places.splice(0,1)
        }
        id++
        res.status(201).send(places)
    },
    read: (req, res) => {
        res.status(200).send(places);
    }
}