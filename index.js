
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import studentModel from './models/student.model.js';
import facilitatorModel from './models/facilitator.model.js';



const app = express();

app.use(express.json());

//add student

app.post('/student/add', async (req, res) => {
    try {
        const addedStudent = await studentModel.create(req.body);
        res.status(201).json({
            message: "Student added successfuly",
            student: addedStudent
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});


// app.post('/student/add',(req,res)=>{
// studentModel.create(req.body)
// .then((response)=>{
// res.status(201).json({
//     message:"Student added successfuly",
//     student: response.data
// });
// })
// .catch((error)=>{
//     console.error(error.message);
//     res.status(500).json({
//         message:"internal server error",
//     });
// })

// });



//get all

app.get('/student/getAll', async (req, res) => {
    try {
        const allList = await studentModel.find();
        res.status(201).json({
            message: "all List of students",
            student: allList
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});

//get by id


app.get('/student/getById/:id', async (req, res) => {
    try {
        const listById = await studentModel.findById(req.params.id);
        res.status(201).json({
            message: "find student ok",
            student: listById
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});


//delete by id

app.delete('/student/delete/:id', async (req, res) => {
    try {

        const deleteById = await studentModel.deleteOne({ _id: req.params.id });
        if (deleteById) {
            res.status(201).json({
                message: "student deleted successfuly"

            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});


//update


app.put('/student/update/:id', async (req, res) => {
    try {
        const updateList = await studentModel.findOneAndUpdate({_id:req.params.id},{
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            nationalId: req.body.nationalId,
            gender: req.body.gender
            
        },{new:true});
        res.status(201).json({
            student: updateList
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "internal server error"
        })
    }

});


//get by email

app.get('/student/getByEmail/:email', async (req, res) => {
    try {
        const findByEmail = await studentModel.findOne({email:req.params.email});

        if(!findByEmail){
            res.status(404).json({
                message:'student not found'
            })
        }
        res.status(201).json({
            message: "find student by email is ok",
            student: findByEmail
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});



//this is for facilitator 

//create facilitator

app.post('/facilitator/add',async(req,res)=>{
    try{
        const body=req.body;
        const addFacilitator=await facilitatorModel.create(body);
        res.status(201).json({
            message:'facilitator was added successfully',
            facilitator:addFacilitator
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'Internal server error'
        })
    }
});


//get all facilitator

app.get('/facilitator/getAll',async(req,res)=>{
    try{
        const listAllFacilitator=await facilitatorModel.find();
        res.status(201).json({
            message:'list of all facilitator',
            facilitator:listAllFacilitator
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'Internal server error'
        })
    }
});


//get facilitator by id

app.get('/facilitator/getById/:id',async(req,res)=>{
    try{
        const findFacilitatorById=await facilitatorModel.findById({_id:req.params.id});
        res.status(201).json({
            message:'list of all facilitator',
            facilitator:findFacilitatorById
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'Internal server error'
        })
    }
});


//delete facilitator

app.delete('/facilitator/delete/:id',async(req,res)=>{
    try{
        const findFacilitatorById=await facilitatorModel.deleteOne({_id:req.params.id});
        if(findFacilitatorById){
        res.status(201).json({
            message:'facilitator deleted successfuly'  
        });
    }}
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'Internal server error'
        })
    }
});

//update facilitator

app.put('/facilitator/update/:id', async (req, res) => {
    try {
        const updateFacilitator = await facilitatorModel.findOneAndUpdate({_id:req.params.id},{
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phoneNumber,
            nationalId: req.body.nationalId,
            courses: req.body.courses,
            role:req.body.role
            
        },{new:true});
        
        res.status(201).json({
          
            message: 'facilitator updated successfuly',
            facilitatorModel:updateFacilitator
        })}
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "internal server error"
        })
    }

});













//database connection

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('conntected to database');
    })
    .catch((error) => {
        console.error('failed to connect to database', error);
    });


    //assign server to the port
    
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

1