//Import data
import data from '../data.json' with { type: 'json'};

//Route that renders title and message to the template.ejs file
const welcomeController = (req, res) => {
    res.render('template', {
        title: 'Welcome to the Express Review',
        message: 'This is an example of rendering an EJS template!',
        users: data
    })
};

export { welcomeController };