<h1>Greader</h1>

<h2>Angular June 2023 - <a href="https://softuni.bg" target=_blank alt="Softuni page">SoftUni </a>exam project</h2>

    Clone the repository:

git clone https://github.com/yuchormanski/Greader.git

    - Project start:
        npm install

    - Run client Angular app:
        ng serve --open    or
        npm start          or
        ng s

# Back-end & API:

    The Firebase database is used for Greader and it is hosted on Firebase Cloud.
    Firebase ensures reliable and scalable data storage for the application.

# File storage

    FIrebase

https://github.com/yuchormanski/Greader/blob/main/src/assets/img/Greader-1.png

Greader is a project for the Angular course in SoftUni accomplished with Angular 16 for the frontend and Firebase for back-end.

Greader is a web application that allows users to share and download ebooks, to view the ebooks in database in resume and get the details about the current selected book.

The project roles are as unregistered user and user with has own profile.

Users has specific privileges and functionalities.

Every user , without needs of authentication can access home, library, limited details, login and register pages.
Every try to access to page without rights should redirect yo login page.

Registered users can achieve the full functionality of the application. In that point:
. viewing their own profile page
. uploading new book
. download every book from the library (unlimited times)
. like the book , uploaded from different user and with that action generate rating on the current book
. has access to personal library
. has ability to edit or delete the their own uploaded book

The main goal of 'Greader' is to provoke interest in reading books by providing an opportunity for easy file access

Site content:

# Home page

    * Available for all users
     - static page except dynamic rendered element of "Our top suggestions!" -  3 books , according to the rating generated , depending on the users likes

# Every page contains navigation

        - according the users rights loading different connections

# Every page , excluding Home page contains footer

        -dynamically load last three uploaded books

# Library

    * Available for all users
        - page loaded all content from the database, according to the uploaded books by registered users.
        - Tha page represent the books with limited information , as book title , cover image and short description
        - also every book has a link to it current profile

# Search

        - by author name or book title, getting all results according users criteria as input

# Book details

        * Available for all users, with limited functionality
            - The page contain the all information about the book
            - can view the information about the current book, number of downloads, uploader name, uploaded date and the likes count

        * Registers users with full functionality
            - everything above plus
            - should be able to download the current book
            - to 'Give a Like" and generate 'up' the book rating
            - every user could like the current book only once
            - if the current user is the owner of the book has no access to 'Like' button

# Book upload

    * Available only for registered users
        - available file extensions - epub, pdf, txt
        - maximum file size is set to 10 MB
        - the user could upload file by 'Drag & Drop' on the D-D-Panel
        - the user could upload file by searching file in the local file system

    * After successful upload the user should enter the all book informational book title, book cover image, year and so on ...
        - all fields are required and are validated

        After successful upload the use ris redirected to library

# Login page

    * Available for all users
    * require user email and password

# Register page

    * Available for all users
    * require users:
        - first name
        - last name
        - email
        - password
         -- password repeat

         After successful register , the user is already login

# Profile page

    * Available only for registered users

    - contain information about the current user

# Current user personal library

    * Available only for registered users

    - list of all user's uploaded books
    - links to managing personal books

# Edit selected book

         * Available only for registered users
          - only the owner could edit the current book

# Delete selected book

         * Available only for registered users
          - only the owner could delete the current book

# About page

    * Available for all users

    - contain information about the site
