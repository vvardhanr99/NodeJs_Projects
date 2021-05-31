const joi = require('@hapi/joi')

const registerValidation = (data)=>{
    const schema = {
        name:joi.string().min(6).required(),
        email:joi.string().min(6).email().required(),
        password:joi.string().min(6).required(),

    }
    return joi.validate(data,schema)

}
module.exports.registerValidation = registerValidation