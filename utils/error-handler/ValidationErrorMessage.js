const getErrorMessage = (errors)=>{
    let err = errors.map((item)=>{
        return ({error_message:item.msg+" for "+item.param})
    })
    return err;
}

module.exports = {getErrorMessage}
