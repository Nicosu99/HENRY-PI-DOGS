const {getAllTempsFromApi}= require ('../controllers/tempController');

const getAllTempsHandler = async (req, res) => {
    try {
        let result = await getAllTempsFromApi()
        await res.status(200).json(result)
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {getAllTempsHandler};

