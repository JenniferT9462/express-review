//Render home
const homeController = (req, res) => {
    res.render('index', {
        title: 'Welcome to EJS Home!',
        message: 'This page dynamically renders using EJS.'
    })
   
};

export { homeController }