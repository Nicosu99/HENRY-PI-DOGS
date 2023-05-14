require ('dotenv').config();
const axios = require ('axios');
const {Dog, Temperament} = require ('../db');
const {API_KEY} = process.env

const getBreedsFromApi = async () => {
    let apiData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    let fromApi = await apiData.data.map((el)=>{
        let weightMin = parseInt(el.weight.metric.slice(0,2).trim());
        let weightMax = parseInt(el.weight.metric.slice(4).trim());
        let averageWeight = weightMax + weightMin

        if (weightMin && weightMax) {
            averageWeight = averageWeight /2
        }
        else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight= averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;
            } else {
            if (el.name === "Smooth Fox Terrier") {
                weightMin = 8;
                weightMax = 8;
                averageWeight= ((weightMax) + (weightMin)) / 2;

            } else {
                weightMin = 20;
                weightMax = 30;
                averageWeight= ((weightMax) + (weightMin)) / 2;
                }
            }
        return {
            id: el.id,
            weightMin: weightMin,
            weightMax: weightMax,
            averageWeight: averageWeight,
            height: el.height,
            name: el.name,
            lifeSpan: el.lifeSpan,
            image: el.image.url,
            temperament: el.temperament
        }
    })
    return fromApi
};

const getBreedsFromDb = async () => {
    let dbData = await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ["name"],
            through: {attributes:[]},
        }],
    });

    let fromDb = dbData.map((el) => {
        return {
        id: el.id,
        weightMax: el.weightMax,
        weightMin: el.weightMin,
        averageWeight: (Number(el.weightMax) + Number(el.weightMin))/2,
        height: el.height,
        name: el.name,
        lifeSpan: el.lifeSpan,
        image: el.image,
        temperament: el.Temperaments? el.Temperaments.map (el=> el.name).join(", "):"Happy",
        created: true,
        }
    });
    return fromDb;
};

const getBreeds = async () => {
    let apiBreeds = await getBreedsFromApi();
    let bdBreeds = await getBreedsFromDb();
    let breeds = bdBreeds ? [...bdBreeds, ...apiBreeds] : apiBreeds;
    return breeds
};

const getBreedsByName = async (name) => {
    let nombre = name.toLowerCase();
    let breeds = await getBreeds();
    let result = await breeds.filter((el) => el.name.toLowerCase().includes(nombre));

    if (result.length){
        return result;
    } else {
        throw new Error('This breed does not exist');
    }
}

const getBreedById = async (id, origin) => {
    try {
        if (origin === 'db'){
            let dogDb = await Dog.findOne({
                where: {
                    id: id,
                },
                include: [{
                    model: Temperament,
                    attributes: ["name"],
                    through: {attributes: []},
                }],
            });

            if (dogDb){
                return {
                    id: dogDb.id,
					weightMax: dogDb.weightMax,
					weightMin: dogDb.weightMin,
                    averageWeight: (Number(dogDb.weightMax) + Number(dogDb.weightMin)) /2,
					height: dogDb.height,
					name: dogDb.name,
					lifeSpan: dogDb.lifeSpan,
					image: dogDb.image,
					temperament: dogDb.Temperaments
						? dogDb.Temperaments.map((el) => el.name).join(', ')
						: 'Happy',
					created: true,
                }
            }
        } else {
            let result = await axios(
				`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
			);

            let perro = result.data.find(el => el.id === Number(id) );
            let weightMin = parseInt(perro.weight.metric.slice(0,2).trim());
            let weightMax = parseInt(perro.weight.metric.slice(4).trim());

            let averageWeight = weightMax + weightMin;

            if (weightMin && weightMax) {
                averageWeight = averageWeight / 2;
            } else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight = weightMin;
            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight = weightMax;
            } else if (inst.name === 'Smooth Fox Terrier') {
                weightMin = 8;
                weightMax = 8;
                averageWeight = (weightMax + weightMin) / 2;
            } else {
                weightMin = 20;
                weightMax = 30;
                averageWeight = (weightMax + weightMin) / 2;
            }

            let dogDetail = {
                id: perro.id,
                name: perro.name,
                height: perro.height.metric,
                lifeSpan: perro.lifeSpan,
                image: perro.image ? perro.image.url : " ",
                temperament: perro.temperament,
                weightMin: weightMin,
                weightMax: weightMax,
                averageWeight: averageWeight,
            };

            return dogDetail;
        }
    } catch (error) {
        return { error: `The dog with id ${id} does not exist`};
    }
};

const createNewDog= async ( weightMin, weightMax, height, name, lifeSpan, image, temperament, created)=> {
    if (!weightMin || !weightMax || !height || !name || !lifeSpan || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            name: name,
			height: height,
			lifeSpan: lifeSpan,
			image: image,
			weightMin: weightMin,
			weightMax: weightMax,
            averageWeight: (weightMax + weightMin) /2,
        })
        let temper= await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
    // return newDog
};

module.exports= {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}