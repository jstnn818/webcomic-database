# Comic Hub

Web-App designed for users to upload and read fanmade comics. Made in with MERN-Stack, using JavaScript in Frontend and Backend.

## Available Scripts

In the project directory, you can run:

### `npm start` in FRONTEND

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run dev` in BACKEND

Runs the backend of the server. Users must connect their own backend, creating an '.env',
in the format of...

PORT=[port_number] \
DB_USER=[db_username] \
DB_PASSWORD=[db_password] \
DB_HOST=[db_host] 

## Home Page

The Home Page will contain two modules.
- A grid, listing all uploaded Comic Series, serving as both a preview and a link to the
respective Comic Series.
- An 'Add a New Series' module, allowing users to add their own Comic Series

![Home Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/home_page.png?raw=true)

## Series Page

The Series Page will contain three modules.
- A preview and overall description box for the Comic Series
- A list of all uploaded chapters, associated with this Comic Series
- An 'Add a New Chapter' module, allowing users to add their own Chapters to the Comic Series, with the ability to upload as many pages as desired.

![Series Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/series_page.png?raw=true)

## Chapter Page

The Chapter Page will contain two modules.
- A navigation bar, to move to previous and following pages, as well as change chapter view, from all pages at once, to one page at a time.
- The current page(s), depending on the chapter view, with the ability of flipping to the previous/next page by clicking on the current page, on its left or right side, respectively.

![Chapter Page Preview](https://github.com/jstnn818/comic-hub/blob/main/readme-images/chapter_page.png?raw=true)