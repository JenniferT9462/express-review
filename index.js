import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))
//Middleware body-parser
app.use(bodyParser.json());


//Basic route
// app.get('/', (req, res,) => {
//     res.send("Welcome to the Express Review!");
// })

//Route that renders title and message to the template.ejs file
app.get('/', (req, res) => {
    res.render('template', {
        title: 'Welcome to the Express Review',
        message: 'This is an example of rendering an EJS template!'
    })
})
//Render Form
app.get('/form', (req, res) => {
    res.render("form")
})

app.post('/saveData', (req, res) => {
    const data = req.body;
    console.log(data);
    console.log("Using Body-parser: ", data.email);
    res.json({
        message: "Data Received"
    })
})

//POST /submit gets urlencoded bodies
app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received data: ${JSON.stringify(data)}`)
})







// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Set EJS as template engine
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//Start the server
app.listen(3000, () => {
    console.log("Express app listening on port 3000");
})