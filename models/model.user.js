const  mongoose =  require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    image:{type:String, require:true},
    developer:{type:Boolean, default:false},
    token:{type:String, require:true},
    date: { type: Date, default: Date.now },
    socket_id:{ type: String, default:"NA"}
}, {timestamps: true});


userSchema.statics.isEmailExistInDb = async function(email){
    try {
        const user = await this.findOne({email})
        if(user) return true
        return false;
    }catch (e){
        return false;
    }
}

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    // delete obj.password;
    // delete obj._id;
    // delete obj.__v;
    return obj;
}

module.exports = mongoose.model('user', userSchema)
