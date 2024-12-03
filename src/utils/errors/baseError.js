class ShrinkItError extends Error{
    constructor(httpStatusCode,name,message,specificMessage){
        super(specificMessage)
        this.httpStatusCode = httpStatusCode
        this.name = name
        this.message = message
        
    }
}

export default ShrinkItError;