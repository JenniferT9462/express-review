# express-review
## Overview

A guide to building a simple Express app that reviews Express basics, routing, and middleware. Learn how to set up and use EJS (Embedded JavaScript) as a templating engine to create dynamic HTML content in an Express application. 

## Setup

1. Create a directory `express-review`:

        mkdir express-routing

2. Make sure to `cd` into the new directory:

        cd express-review

3. Initialize a `Node.js` project:

        npm init -y

4. Install express:

        npm install express

5. Open new project in VSCode:

        code .

6. In the package.json file add `"type": "module"` to Enable ES Module Syntax (import/export).

## Server Implementation
* Create a file named `index.js`.
* In the index.js file import express:
    ```js
    import express from "express";

* To create a instance of express:
    ```js
    const app = express();

* Create a basic route at the root `/` path that returns welcome message, to make sure that the server is working. 
    ```js
    //Basic route at root URL
    app.get('/', (req, res) => {
        res.send("Welcome to Express Review!")
    })

* To start the server you need to add this to the `index.js` file at the bottom:
    ```js
    //Start the server
    app.listen(3000, () => {
        console.log("Example app listening on port 3000")
    })
## EJS Setup

EJS stands for Embedded JavaScript Templating, a popular template engine for JavaScript that allows developers to generate HTML with JavaScript.

* To use ejs you will need to install it to your project:

    ```bash
    npm install ejs

* For this guide I have my render routes in a separate folder named `controllers`. We will have to export the render function and then `app.get` in the main `index.js` file. Example route that displays a title and message:

    ```js
    //Route that renders title and message to the template.ejs file
    const welcomeController = (req, res) => {
        //'template' is the name of the 'ejs' file in the project
        res.render('template', {
            //We will embedded the 'title' and 'message' in the 'ejs' file
            title: 'Welcome to the Express Review',
            message: 'This is an example of rendering an EJS template!',
        })
    };

    export { welcomeController };

* The default behavior of EJS is that it looks into the 'views' folder for the templates to render.
    * Create a folder named `views`. Inside that folder create a file named `template.ejs`.
* In the `template.ejs` file create a `html` page that has a `h1` tag for the `title` and a `p` tag for the message. We will use `ejs` syntax to embedded the `title` and `message` to the page:

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title><%= title %></title>
        </head>
        <body>
            <h1><%= title %></h1>
            <p><%= message %></p>
        </body>
    </html>

* Notice the `<%= title %>` syntax. The `<%= %>` syntax is used to output the value of the `title` and `message` variables that we defined in the render route. 
* Set the `esj` engine in the `index.js` file:
    ```js
     //Set EJS as template engine
    app.set('view engine', 'ejs')
    
#### Create EJS Partials

Partials are essentially reusable templates that help avoid repetition, making your code cleaner and easier to maintain. 
- Partials are typically used for sections of a webpage that are repeated across multiple pages, such as:
    - Navigation bars
    - Headers
    - Footers
    - Sidebars
- Create a `partials` folder inside the `views` folder.
- Create `header.ejs`, `footer.ejs` and `navBar.ejs` partials.
    - Create `header.js`:
        ```html
        <header style="background:lightblue; padding: 10px;">
            <h2>My Dynamic Webpage</h2>
        </header>
    - Create `footer.js`:
        ```html
        <footer style="background: lightgray; padding: 10px;">
            <p>&copy; <%= new Date().getFullYear() %> CodeX Academy</p>
        </footer>
    - Create `navBar.js`:
        ```html
        <nav class="navbar">
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/">Welcome</a></li>
                <li><a href="/form">Form</a></li>
            </ul>
        </nav>
- To include this in your pages, go to your `template.ejs` file.
- Use the `<%- include('path/to/partial') %>` syntax. EJS provides the `<%- include() %>` function to include partials in a template. This function embeds the content of the specified partial file into the template.
    - For the `header.ejs`:
        ```html
        <%- include('partials/header') %>
    - For the `footer.ejs`:
        ```html
        <%- include('partials/footer') %>
    - For the `navBar.ejs`:
        ```html
        <%- include('partials/navbar') %>
    - To use the static files for the header, footer and navBar, include this in your `index.js` file. 
        ```js
        // Serves static files 
        app.use('/views', express.static('views'));
#### Add a Route to Render User Data
-  Create the Route `/users`
- This route will handle requests to `/users` and render an EJS template.
    ```js
    app.get('/users', (req, res) => {
        // Example user data
        const users = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 },
        ];
    });

- `app.get('/users')`: Sets up a route to respond to GET requests at `/users`.
- Create an EJS Template `views/users.ejs`
This file will dynamically render the list of users.
    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Users</title>
        </head>
        <body>
            <h1>List of Users</h1>
            <ul>
                <% users.forEach(user => { %>
                <li><%= user.name %> (Age: <%= user.age %>)</li>
            <% }) %>
            </ul>
        </body>
    </html>

- `<% ... %>`: Embeds JavaScript logic (e.g., looping through the users array).
- `<%= ... %>`: Outputs values (e.g., user.name and user.age) into the HTML.
- To render the `users.ejs` you need to add this to your `index.js` file:

    ```js
     // Pass the user data to the EJS template
    res.render('users', { users });

## Setup Middleware

For this guide I will be using `body-parser`, `morgan` and `helmet` middleware. 

* You can install all at the same time by running:

    ```bash
    npm install body-parser morgan helmet

* In the `index.js` file, import the installed packages:

    ```js
    //Import middleware packages
    import bodyParser from 'body-parser';
    import morgan from 'morgan';
    import helmet from 'helmet';
* Use Third-Party Middleware:
    - Setup `body-parser`
    - This middleware parses incoming request bodies in JSON, URL-encoded, or raw formats, making the data accessible via `req.body`.
        ```js
        app.use(bodyParser.json()); // Parse JSON bodies
        // Parse URL-encoded data
        app.use(bodyParser.urlencoded({ extended: true })); 
    - Setup `morgan`
    - Morgan logs HTTP requests in a specified format (e.g., combined, tiny).
        ```js
        // Logs requests in 'combined' format
        app.use(morgan('combined')); 
    - Setup `helmet`
    - Helmet helps secure your app by setting various HTTP headers.
        ```js
        app.use(helmet());
* Create Custom Middleware:
    - You can define a custom middleware function to log request details like method, URL, and timestamp. Middleware functions typically have three parameters: `req`, `res`, and `next`.
        ```js
        //Custom middleware that logs request details
        const detailsLogger = (req, res, next) => {
            //Current time
            req.time = new Date(Date.now()).toString(); 
            //Output: GET localhost / Thu Dec 05 2024 21:24:24 GMT-0600 (Central Standard Time) 'method hostname path time'
            console.log(req.method, req.hostname, req.path, req.time); 
            next();
        };
    
    - Use the custom middleware by adding this to your `index.js` file before your routes:
        ```js
        //Use details logger middleware
        app.use(detailsLogger);
