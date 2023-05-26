const {getBreeds, getBreedsByName, getBreedById, createNewDog} = require ('../controllers/dogsController');

const getBreedsHandler = async (req, res) => {
    const {name} = req.query;
    try{
        if(!name){
            let result = await getBreeds();
            return res.status(200).json(result)
        }
        else{
            let result = await getBreedsByName(name);
            return res.status(200).json(result)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const getBreedByIdHandler = async (req, res) => {
    const {idBreed} = req.params
    let origin= isNaN(idBreed) ? "db" : "api";
    try{
        let result= await getBreedById(idBreed,origin);

        if (result.error) throw new Error(result.error);

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const createNewDogHandler = async (req, res) =>{
    let { weightMin, weightMax, height, name, life_span, image, temperament, from_DB} =
      req.body;
    try {
      // espera los datos
      await createNewDog(weightMin, weightMax, height, name, life_span, image, temperament);
      res.status(200).send("Nuevo perrito creado perfectamente");
      // si todo salió bien 200 OK
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports ={
    getBreedsHandler,
    getBreedByIdHandler,
    createNewDogHandler
}