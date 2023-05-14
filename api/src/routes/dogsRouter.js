const {Router} = require ('express');
 const {getBreedsHandler, getBreedByIdHandler,createNewDogHandler} = require ('../handlers/dogsHandler')

const dogsRouter = Router();

dogsRouter.get('/', getBreedsHandler);
dogsRouter.get('/:idBreed', getBreedByIdHandler);
dogsRouter.post('/',createNewDogHandler);


// dogsRouter.get('/', (req,res) => {
//     res.send("i'm in Dogs route");
// });

// dogsRouter.get ('/:idBreed', (req, res) => {
//     res.send ("I'm in Raza by Id Route");
// });

// dogsRouter.post ('/', (req, res) => {
//     res.send ("I'm in form Route");
// });

module.exports = dogsRouter;