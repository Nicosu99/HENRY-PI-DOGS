const validationBox =(form)=>{
    let errors= {};
    let regexName = /^[a-zA-Z]{3,25}$/
    let regexHeight = /^[1-9][0-9]?$|^99$/
    let regexWeightMin = /^[1-9][0-9]?$|^99$/
    let regexWeightMax = /^[1-9][0-9]?$|^99$/
    let regexLife_span = /^(1?[1-9]|25)$/
    let regexImage = /\bhttps?:\/\/\S+\.(jpg|jpeg|png|gif|bmp)\b/
    let regexTemperament = /^[a-zA-Z\s]*$/

    if(form.name && !regexName.test(form.name.trim())){
        errors.name = "The name only accepts letters and must be between 3 and 25 characters."
    }

    if(form.weightMin && !regexWeightMin.test(form.weightMin)){
        errors.weightMin = "The minimum weight can be between 1 and 99."
    }

    if(form.height && !regexHeight.test(form.height)){
        errors.height = "The height can be between 1 and 99."
    }

    if(form.weightMax && !regexWeightMax.test(form.weightMax)){
        errors.weightMax = "The maximum weight can be between 1 and 99."
    }

    if(form.image && !regexImage.test(form.image.trim())){
        errors.image = "Must be a URL with an image in .jpg, .jpeg, .png, .gif or .bmp format."
    }

    if(form.life_span && !regexLife_span.test(form.life_span)){
        errors.life_span = "It can only be between 1 and 25"
    }

    // if(form.temperament && !regexTemperament.test(form.temperament.trim())){
    //     errors.temperament = "Error in temperament regex"
    // }

    return errors
}
export default validationBox;