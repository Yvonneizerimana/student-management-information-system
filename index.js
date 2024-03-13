
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import studentModel from './models/student.model.js';


const app=express();

app.use(express.json());


app.post('/student/add',async(req,res)=>{
try{
    const addedStudent=await studentModel.create(req.body);
    res.status(201).json({
        message:"Student added successfuly",
        student:addedStudent
    })
}
catch(error){
    console.log(error.message);
res.status(500).json({
    message:"internal server error"
} );
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


app.get('/student/getAll',async(req,res)=>{
    try{
        const allList=await studentModel.find();
        res.status(201).json({
            message:"all List of students",
            student:allList
        })
    }
    catch(error){
        console.log(error.message);
    res.status(500).json({
        message:"internal server error"
    } );
    }
    });


    app.get('/student/getById/:id',async(req,res)=>{
        try{
            const listById=await studentModel.findById(req.params.id);
            res.status(201).json({
                message:"find student ok",
                student:listById
            })
        }
        catch(error){
            console.log(error.message);
        res.status(500).json({
            message:"internal server error"
        } );
        }
        });


        app.put('/student/delete/:id',async(req,res)=>{
            try{
                const listById=await studentModel.findById(req.params.id);
                if(listById){
                    
                }
                res.status(201).json({
                    message:"student deleted successfuly"
                
                })
            }
            catch(error){
                console.log(error.message);
            res.status(500).json({
                message:"internal server error"
            } );
            }
            });      
    

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log('conntected to database');
})
.catch((error)=>{
console.error('failed to connect to database',error);
});

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

