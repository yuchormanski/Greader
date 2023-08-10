<h1>Greader</h1>

<h2>Angular June 2023 - <a href="https://softuni.bg" target=_blank alt="Softuni page">SoftUni </a>exam project</h2>

<p>Project DEMO - <a href="https://greader.vercel.app" target="_blank">Greader</a></p>

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

    Firebase

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

# Every page contains navigation

![nav](https://github.com/yuchormanski/Greader/assets/693307/f5329eb0-3738-4473-b286-50caf5dc311d)

        - according the users rights loading different connections

# Every page , excluding Home page contains footer

        -dynamically load last three uploaded books

# Home page

![home](https://github.com/yuchormanski/Greader/assets/693307/ed7ece35-24e4-4893-9742-68bcf524e69c)

    Available for all users
     - dynamic rendered element of "Our top suggestions!" -  3 books , according to the rating generated , depending on the users likes

# Library

![capture_002_07082023_204010](https://github.com/yuchormanski/Greader/assets/693307/4aa0b861-6fb3-4dfb-b1a8-65d534d0d0d3)
![capture_003_07082023_204322](https://github.com/yuchormanski/Greader/assets/693307/98333172-d103-44fd-83de-11812851afa8)
![capture_004_07082023_204507](https://github.com/yuchormanski/Greader/assets/693307/6a24eaf8-c690-4842-aa01-29968dc8c626)

    Available for all users
        - page loaded all content from the database, according to the uploaded books by registered users.
        - Tha page represent the books with limited information , as book title , cover image and short description
        - also every book has a link to it current profile
    Page includes pagination

# Search

        - by author name or book title, getting all results according users criteria as input

# Sort

        - by title,
        - by author,
        - by rating,
        - by language

# Book details

        Available for all users, with limited functionality
            - The page contain the all information about the book
            - can view the information about the current book, number of downloads, uploader name, uploaded date and the likes count


![capture_005_07082023_204922](https://github.com/yuchormanski/Greader/assets/693307/995df9c9-5e5d-46fc-a48c-690b12801d72)

        Registers users with full functionality
            - everything above plus
            - should be able to download the current book

![capture_006_07082023_205137](https://github.com/yuchormanski/Greader/assets/693307/0c6ff107-9d9b-4584-b1f2-18053bfc9246) - to 'Give a Like" and generate 'up' the book rating - every user could like the current book only once - if the current user is the owner of the book has no access to 'Like' button

# Book upload

    Available only for registered users
        - available file extensions - epub, pdf, txt
        - maximum file size is set to 10 MB
        - the user could upload file by 'Drag & Drop' on the D-D-Panel
        - the user could upload file by searching file in the local file system

![capture_007_07082023_205347](https://github.com/yuchormanski/Greader/assets/693307/2c715bea-1d87-4ff3-8b17-8386dea27f4d)

    After successful upload the user should enter the all book informational book title, book cover image, year and so on ...
        - all fields are required and are validated

![capture_008_07082023_205744](https://github.com/yuchormanski/Greader/assets/693307/3efb7b2e-bf5e-4df1-98ca-2d551c786399)

        After successful upload the use ris redirected to library

# Login page

![capture_009_07082023_205900](https://github.com/yuchormanski/Greader/assets/693307/33726de6-bd23-4d59-8797-526fcc79e660)
Available for all users

# Register page

    Available for all users
    After successful register , the user is already login

![capture_010_07082023_210013](https://github.com/yuchormanski/Greader/assets/693307/f9ab2a24-f737-434f-87f1-ca02b3815338)

# Profile page

    Available only for registered users
    - contain information about the current user

# Current user personal library

![capture_011_07082023_210200](https://github.com/yuchormanski/Greader/assets/693307/e2da3e53-1c0e-45f4-8e6b-cccb4fa60aed)

    Available only for registered users
    - list of all user's uploaded books
    - links to managing personal books

# Edit selected book

![capture_012_07082023_210246](https://github.com/yuchormanski/Greader/assets/693307/d6efdc75-81a0-4a50-95b4-bbda554073fa)

     Available only for registered users
     - only the owner could edit the current book

# Delete selected book

![capture_013_07082023_210407](https://github.com/yuchormanski/Greader/assets/693307/03cbe0ec-1fd1-4f28-be32-0cbfc26f8a80)

    Available only for registered users
    - only the owner could delete the current book

# About page

    Available for all users
    - contain information about the site
