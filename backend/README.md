# DEV'S CORNER Backend

## To start the Backend in dev mode:

    1. cd -project-/backend
    2. Clone the repo from Github.
    3. Run `npm install`
    4. Create _.env_ from _.env.sample_ file and add your DB parameters. Don't delete the _.sample_ file, it must be kept.

```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=key_for_json_web_token

```

    5. Adapt _database.sql_ with your own tables. Import the script in your SQL server. You can do it manually or run _migrate_ script (either using `npm run migrate`).
    6. Start the server in dev mode with `npm run dev` . This will run `index.js` using _nodemon_.
    7. Go to `localhost:5000` with your favorite browser.
    8. From this starter kit, create your own web application.

    ### Windows Users

If you develop on Windows, you should edit you git configuration to change your end of line rules with this command :

`git config --global core.autocrlf true`

## Public Route

### POST/api/login

req :

````json
  [
    {
      "firstname": string,
      "lastname": string,
      "email": string,
      "password": string,
    }
  ]

### POST/api/users

req :

```json
  [
    {
      "firstname": string,
      "lastname": string,
      "email": string,
      "password": string,
      "secondPassword": string,
    }
  ]

You can find all these routes declared in the file `src/router.js`. You can add your own new routes, controllers and models.
```
````
