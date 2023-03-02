export const validate = (input)=>{
    const inputType= input.dataset.tipo
    if(validators[inputType]){
        validators[inputType](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = " "
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMsg(inputType, input)
    }

}

const errorTypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]


const errorMessage ={
    name:{
        valueMissing:"Este campo no puede estar vacio."
    },
    email:{
        valueMissing:"El campo correo no puede estar vacio.",
        typeMismatch: "El correo no es válido."
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio.",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    birthDate:{
        valueMissing:"Este campo no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad"
   },
    phoneNumber:{
        valueMissing:"El campo número no puede estar vacio",
        patternMismatch:"El formato requerido es (XXXXXXXXXX) 10 digitos"
    },
    direccion:{
        valueMissing:"El campo no puede estar vacio",
        patternMismatch:"La dirección debe tener entre 6 y 40 caracteres"
    },
    ciudad:{
        valueMissing:"El campo no puede estar vacio",
        patternMismatch:"La ciudad debe tener entre 6 y 40 caracteres"
    },
    departamento:{
        valueMissing:"El campo no puede estar vacio",
        patternMismatch:"La dirección debe tener entre 6 y 40 caracteres"
    }

}



const validators = {
    birthDate : input => validateBirthDate(input)
}

const showErrorMsg = (inputType, input)=>{
    let message = ""
    errorTypes.forEach((error)=>{
        if(input.validity[error]){
           message = errorMessage[inputType][error]
        }
    })
    return message;
}


const validateBirthDate = (inputDate)=>{
    const clientBirthDate = new Date(inputDate.value)
    let message = " "
    if(!consultAge(clientBirthDate)){
        message = " Debes tener al menos 18 años de edad ";
    }

    inputDate.setCustomValidity(message)
}

const consultAge = (date)=>{
    const todayDate = new Date();
    const difDates = new Date(
    date.getUTCFullYear() + 18, 
    date.getUTCMonth(), 
    date.getUTCDate())
    
    return difDates <=  todayDate;
}


