README: React Evernote-NotesCreator
======================
NotesCreator is an app where users can create, edit, delete, filter notes and keep a record of them.
+ Designed internal API with Ruby on Rails to enable full CRUD for notes.
+ Leveraging React and JavaScript for design on the front end.         
+ Utilized CSS for styling the user interface.

Demo:
https://youtu.be/BbjDYbm2Gu4

Author: 

Germain Arturo Duran Torres
## Setup

The codebase is split up into a Rails API backend and a React frontend. Everything is contained in this single repository. The Rails code is located inside of the `backend` folder and your React code is located inside of the `frontend` folder.

Each of those folders has a README file with setup instructions. For conciseness, those instructions are copy pasted here:

### Frontend

```sh
# from within this directory:
npm install

```

### Backend

```sh
# from within this directory:
bundle install
rails db:create db:migrate db:seed
rails s
```

Thw Rails backend API will be running on `http://localhost:3000`.

#### User ID

The seed file should create one user for you, so your default `USER_ID` should be `1`. If that doesn't work, debug it with the `/api/v1/users` route as shown below.

#### Routes

| Method | Route               | Headers                                                              | Body                 |
| ------ | ------------------- |:--------------------------------------------------------------------:|:--------------------:|
| GET    | `/api/v1/users`     |                                                                      |                      |
| GET    | `/api/v1/notes`     |                                                                      |                      |
| POST   | `/api/v1/notes`     | `'Content-Type': 'application/json'`<br/>`'Accept': 'application/json'` | title, body, user_id |
| PATCH  | `/api/v1/notes/:id` | `'Content-Type': 'application/json'`<br/>`'Accept': 'application/json'` | title, body, user_id |
