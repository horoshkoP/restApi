# restApi

a simple rest api, which allows user to send requests to the server using postman and create, get, update or delete a specific todo, get all todos and clear the database using different types of requests.

to start the project, clone the files, run npm init and then node index.js or npm run dev

the server will start on port 3000(by default)

open postman and enter the address localhost:3000/todos.

to get all the items in db use a get request / to get a specific item, enter /:id after the initial address

to add item to the db, use post request.

to update the existing item, add /:id to the path and enter fields that are to be updated,

to delete all the items in db, use purge request

that is basically it, thank you for your time!
