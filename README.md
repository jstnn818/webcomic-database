# WebComic Database

Web-App designed for users to upload and read fanmade comics. Made in with MERN-Stack, using TypeScript in Frontend and JavaScript in Backend, and containerized via Docker.

This Web-App utilizes the MERN-Stack (MongoDB, Express, React, Node) in order to implement the functionality of this application. Primarily, it takes advantages of React's component system to create each page, and utilizes MongoDB's NoSQL Database in order store each series and chapter uploaded by each user.

## Available Scripts

There are a few ways to run the Web-App...

### DOCKER

WebComic Database is containerized with Docker, and can be run using Docker Compose. Use `docker-compose up` to build the image, and run the container. \
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

NOTE: Ensure that the '.env' information, mentioned in the BACKEND section, to be created and filled, prior to building the app.

Alternatively, if you don't have Docker, you can run the Web-App as follows...

### `npm start` in FRONTEND [TEMP DEFUNC (Use Docker)]

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run dev` in BACKEND [TEMP DEFUNC (Use Docker)]

Runs the backend of the server. Users must connect their own backend, creating an '.env',
in the format of...

PORT=[port_number] \
DB_USER=[db_username] \
DB_PASSWORD=[db_password] \
DB_HOST=[db_host] \
SECRET=[secret_string]

## Web-App Features

### Home Page

The Home Page will contain four modules.
- A grid, listing all uploaded Comic Series, serving as both a preview and a link to the
respective Comic Series.
- A 'User/Login' module that will allow users to sign up, login, or sign out.
- An 'Edit' module, allowing users to add their own Comic Series, provided they are logged in.
- A 'Featured' module, displaying series with most views, and those that are newly uploaded.

![Home Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/home_page.png?raw=true)

### Series Page

The Series Page will contain three modules.
- A preview and overall description box for the Comic Series.
- A list of all uploaded chapters, associated with this Comic Series.
- An 'Edit' module, allowing users to add their own Chapters to the Comic Series, or edit the description
of the series, provided they are logged in.

![Series Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/series_page.png?raw=true)

### Chapter Page

The Chapter Page will contain two modules.
- A navigation bar, to move to previous and following pages, as well as change chapter view, from all pages at once, to one page at a time.
- The current page(s), depending on the chapter view, with the ability of flipping to the previous/next page by clicking on the current page, on its left or right side, respectively.

![Chapter Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/chapter_page.png?raw=true)

### User Authentication & Uploading

In order to upload your own series to the Web-App, a user must be signed into an account, taking advantage of JSON Web Tokens for its implementation. If no account exists, a user can create an account by signing up.

![Login Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/login_page.png?raw=true)

After having made an account, on both the Home and Series Page, a user may click on the 'Edit' Module in order to make changes to a respective series.

![Edit Module Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/edit_module.png?raw=true)

Here, a user may fill out information accordingly and upload images from their local computer.

![Add Module Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/add_module.png?raw=true)

## Issues & Future Plans

Currently, while series are associated with a single user, they are editable by all accounts. In the future, this will be fixed so that series can either be made public or private, and only being editable by the creator and accounts allowed by the creator.

In regards to images, series covers or chapter images, as images are uploaded onto the MongoDB NoSQL Database, there is a limit on the size of the image. From experience, refrain from using images greater than 1000 KB.