const express=require('express'); //require express to setup the express server

const port=8000; // set up the port

const db=require('./config/mongoose'); //importing the database

const Task=require('./models/task'); //importing the schema

const app=express(); //using express

app.use(express.static('./views')); //using static files
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');


//rending app page
app.get('/',function(req,res){
    Task.find({},function(err,task){
        if(err){
            console.log('Error in fetching task from db');
            return;
        }

        return res.render('home',{
            title:"Home",
            task:task
        });
    });
});

//creating task
app.post('/create-task',function(req,res){
    Task.create({
        description:req.body.description,
        catageory:req.body.catageory,
        date:req.body.data
    }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}   

        return res.redirect('back');   
    });
});

app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server ${err}`);
    }

    console.log(`Server is runnig on port: ${port}`);
});