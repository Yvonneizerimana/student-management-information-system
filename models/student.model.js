import mongoose from 'mongoose';

const studentSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
    
},
phoneNumber:{
    type:String,
    required:true,
    unique:true
},
nationalId:{
    type:String,
    required:true,
    unique:true,
    length:16
},
gender:{
    type:String,
    required:true,
    enum:{
        values:['Male','Female'],
        message:'Gender must be either Female or Male'
    }

},
},{timestamps:true});

const studentModel=mongoose.model('Student',studentSchema);
export default studentModel;
