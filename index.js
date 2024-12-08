import express from 'express';

//Import middleware npms
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

//Import middlewares
import { detailsLogger } from './middleware/detailsLogger.js'

//Import controllers
import { welcomeController } from './controllers/welcomeController.js';
import { homeController } from './controllers/homeController.js';
import { formController } from './controllers/formController.js';

const app = express();

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

//Set EJS as template engine
app.use('/views', express.static('views'));
app.set('view engine', 'ejs')

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))
//Middleware body-parser
app.use(bodyParser.json());

//Morgan Middleware - predefined format string - Standard Apache combined log output.
// Output - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
app.use(morgan('combined'));

//Helmet Middleware
app.use(helmet());

//Use details logger middleware
app.use(detailsLogger);


//Render welcome page
app.get('/', welcomeController);
//Render home page
app.get('/home', homeController);
//Render form page
app.get('/form', formController)

//Basic route
// app.get('/', (req, res,) => {
//     res.send("Welcome to the Express Review!");
// })

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


//Start the server
app.listen(3000, () => {
    console.log("Express app listening on port 3000");
})