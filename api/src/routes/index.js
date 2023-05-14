//Imports 
const { Router } = require('express');
const dogsRouter = require ('./dogsRouter');
const tempRouter = require ('./tempRouter')


//In this module, we have a main router to have separate routes.
const router = Router();


//Everything that goes to "/dogs" will go through here.
router.use('/dogs', dogsRouter); 

// and everything that goes to "/temperaments" will go through here.
router.use('/temperaments', tempRouter); 



module.exports = router;
