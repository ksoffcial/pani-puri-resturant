var validator = require('validator');

const validateData = (data) => {
    if (!data) {
        throw new Error("Data is not coming.....")
    }

    const maditoryField = ["fullName", "emailId", "password"]
    const isAllowed = maditoryField.every((k) => Object.keys(data).includes(k))

    if(!isAllowed){
        throw new Error("fill all required field ")
    }

    if(!validator.isEmail(data.emailId)){
        throw new Error("Email id is not correct...")
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Please Enter the storngest password")
    }

    if(!validator.isMobilePhone(data.phoneNumber,'en-IN')){
        throw new Error("please check the number once")
    }
}

module.exports = validateData;