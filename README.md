Promise Tracker App
The Promise Tracker App is a web application that allows users to track promises they've made, including details such as name, promise description, context, promised date, completion date, category, and status. The app provides functionalities to add, update, delete promises, view all promises, and view statistics.

Installation
To install the Promise Tracker App, follow these steps:
    - Download the zip file and extract it
    - run npm install on the main folder
    - run npm start to run the server
    - while the server is running, open another terminal and change the directory to client
    - run npm install 
    - run npm run dev
    - Go to http://localhost:5173/

Creating the Database
The Promise Tracker App automatically creates the SQLite database and necessary tables when the application is started for the first time. There's no need for users to manually create the database or tables.

Usage
After setting up and running the application, you can access it through your web browser.
Use the provided UI to add, update, delete promises, view all promises, and view statistics.

Technologies Used
Node.js
Express.js
SQLite
React.js
Axios
Styled Components

Database schema and rationale 
The database schema consists of a single table named promises, designed to manage promises made by users. 

id (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each promise.
name (TEXT, NOT NULL): Name of the promise maker.
promise (TEXT, NOT NULL): Content of the promise.
context (TEXT): Additional context or details.
promised_on (DATE, NOT NULL): Date when the promise was made.
to_be_completed_date (DATE, NOT NULL): Deadline for completion.
category (TEXT): Categorization of promises.
completed (BOOLEAN, NOT NULL): Status of promise fulfillment.

The rationale behind this schema is to capture essential information about promises made by users and facilitate efficient tracking and management of these promises. Each field serves a specific purpose in providing comprehensive details about each promise, including who made it, what was promised, when it was promised, and whether it has been fulfilled.
