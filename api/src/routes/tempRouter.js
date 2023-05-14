const {Router} = require ('express');
const {getAllTempsHandler} = require ('../handlers/tempHandler')
const tempRouter = Router();

// tempRouter.get('/', (req, res) => {
//     res.send("I'm in Temperaments Route");
// });

tempRouter.get ('/', getAllTempsHandler);

module.exports = tempRouter;