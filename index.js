import express from 'express';

const app = express();


//Basic route
// app.get('/', (req, res,) => {
//     res.send("Welcome to the Express Review!");
// })

app.get('/', (req, res) => {
    res.render('template', {
        title: 'Welcome to the Express Review',
        message: 'This is an example of rendering an EJS template!'
    })
})



//Set EJS as template engine
app.set('view engine', 'ejs')

//Start the server
app.listen(3000, () => {
    console.log("Express app listening on port 3000");
})