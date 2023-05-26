import {
    FILTER_BY_ORIGIN, 
    GET_ALL_BREEDS, 
    ORDER_BY_NAME, 
    ORDER_BY_WEIGHT, 
    GET_ALL_TEMPS, 
    FILTER_BY_TEMPER, 
    GET_DOG_BY_NAME, 
    GET_DOG_DETAIL, 
    RESET_DETAIL, 
    GET_NAME, 
    SET_CURRENT_PAGE,
    CREATE_DOG
    } from "./action_types"

    const initialState = {
        currentPage: 1,
        dogs: [],
        dogDetail:{},
        temperaments: [],
        allDogs: []
    };

    const reducer = (state = initialState, action) => {
        let aux = []

        switch(action.type){
            case GET_ALL_BREEDS:
                return{
                    ...state,
                    dogs: action.payload,
                    allDogs: action.payload,
                };
            
                case GET_DOG_BY_NAME:
                    return{
                        ...state,
                        dogs: action.payload,
                    };
                
                case ORDER_BY_NAME:
                    let ordered = 
                    action.payload === "a-z"
                    ? state.dogs.sort((a,b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.dogs.sort ((a,b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
                    return {
                        ...state,
                        dogs: ordered,
                    };
                
                case ORDER_BY_WEIGHT:
                    if (action.payload === "min") {
                        aux = state.dogs.sort ((dogA, dogB) => {
                            if (dogA.weightMin < dogB.weightMin) return -1;
                            if (dogA.weightMin > dogB.weightMin) return 1;
                            return 0;
                        });    
                    } else if (action.payload === "max") {
                        aux = state.dogs.sort ((dogA, dogB) => {
                            if (dogA.weightMax > dogB.weightMax) return -1;
                            if (dogA.weightMax < dogB.weightMax) return 1;
                            return 0;
                        });
                    } else if (action.payload === "ave"){
                        aux = state.dogs.sort ((dogA, dogB) => {
                            if (dogA.averageWeight < dogB.averageWeight) return -1;
                            if (dogA.averageWeight > dogB.averageWeight) return 1;
                            return 0;
                        });
                    }else if (action.payload === "ave-max") {
                        aux = state.dogs.sort ((dogA, dogB) => {
                            if (dogA.averageWeight > dogB.averageWeight) return -1;
                            if (dogA.averageWeight < dogB.averageWeight) return 1;
                            return 0;
                        });
                    } else {
                        console.log("error");
                    }

                    return {
                        ...state,
                        dogs: aux,
                    };

                    case GET_ALL_TEMPS:
                        return {
                            ...state,
                            temperaments: action.payload,
                        };
                    
                    case FILTER_BY_ORIGIN:
                        const filteredOrigin = 
                        action.payload === "created"
                        ? state.allDogs.filter((inst) => inst.created)
                        : state.allDogs.filter((inst) => !inst.created);
                        return {
                            ...state,
                            dogs: action.payload === "All" ? state.allDogs : filteredOrigin,
                        };
                    
                    case FILTER_BY_TEMPER:
                        let dogsWithChosenTemps = 
                        action.payload === "all"
                        ? state.allDogs
                        : state.allDogs?.filter ((dog) => {
                            if (!dog.temperament) return undefined;
                            return dog.temperament.split(", ").includes(action.payload);
                        })
                        return {
                            ...state,
                            dogs: dogsWithChosenTemps
                        };
                    
                    case GET_DOG_DETAIL:
                        return {
                            ...state,
                            dogDetail: action.payload
                        }
                        
                    case GET_NAME:
                        let name =
                        action.payload === ""
                        ? state.allDogs
                        : state.dogs.filter((inst) => 
                        inst.name.toLowerCase().includes(action.payload.toLowerCase())
                        );
                        return {
                            ...state,
                            dogs: name,
                        };

                    case CREATE_DOG:
                        return {
                            ...state,
                        };
                    
                    case RESET_DETAIL:
                        return {
                            ...state,
                            dogDetail: {},
                        };

                    case SET_CURRENT_PAGE:
                        return {
                            ...state,
                            currentPage: action.payload,
                        };
                    
                    default:
                        return {...state};
        }
    };

    export default reducer;