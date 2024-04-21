class BaseValidator{

    constructor(schema, input){
        this.schema = schema
        this.input = input
    }

    validate(){
        const { error, value } = this.schema.validate(this.input)
        if(error) return {success: false , error : {...error, from : "joi"}} 
        else return {success: true , value}
    }   
}


module.exports = BaseValidator