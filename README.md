# Homework API

- watch Problem section in the end

## Run project

- npm install
- npm start
- Go to http://localhost:3000

## API documentation:

- Start project - npm start

For other script look at the package.json

We are building API for apartment building. 12 apartments.
Utilities like water, gas and etc.

Switch between branches:

- `$ git checkout <baranch_name>`

### Lets add parts of our api.

We hawe apartment owners (users) and they are using services.  
Let's begin from users.

- Add databse `db.ts` with users to the root of project
- Add `components/users/interfaces.ts` for users and import it to database.
- Add `components/users/controller.ts`
  For that we need express, responseCodes, user interfaces and services ts files. In services.ts we defining all request from database.
- Create `general/responseCodes.ts`
- Create `users/services.ts`

### now create index.ts

index.ts must assemble all parts what we did.
So now our `index.ts`looks like this:

```javascript
import express, { Application } from 'express';
import cors from 'cors';
import usersController from './components/users/controller';

import { port } from './components/general/settings';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
```

### Add middleware for testing purposes

We add middleware to `components/general/testMiddleware.ts`
At the beginning we add just testing purposes middleware, what says, is the connection https or not and also tels us one defined variable.  
No point, just testing.

We need import our middleware to `index.ts` and then register it – `app.use()`

### Short description about what we did

- in `interfaces.ts` we explaining to api, what kind can be the data in specific database place. So if in interface are `id`and `name`then we cant use something more in database. Now we can import those interfaces to database file, so the database know, what data must be in database.  
  In `service.ts`we have all endpoints.  
  And in `controller.ts`we have functions, what are doing what we need.

### next do the same to all endpoints.

At the moment we have Users, Utilities, gasVolume and random servicees.  
Later we decide, what we need more or maybe we must merge some of endpoints.
For each i created endpoint.

### Passwords hashing

We need install crypting module  
`npm install bcrypt`
`npm install --save-dev @types/bcrypt`

- new folder for API services:  
  `general/services/hashService.ts`

- Test hashing  
  postman or thunder client  
  post
  localhost:3000/users
  Body
  json

**_ For posting you must have post endpoint _**

### make auth folder with service and controller

### JWT

- Install JSON WEB Token `npm install jsonwebtoken` and `npm install --save-dev @types/jsonwebtoken`

* create `isLoggedInMiddleware.ts`
  This middleware controlls, is user logged in or not.
*

Video stop 17.00

### Tokens

- How do we get Token?
  In Thunder client or Postman lets do first POST  
   localhost:3000/users:

  ```json
  {
    "firstName": "Vello",
    "lastName": "Perenimi",
    "email": "onu@mets.ee",
    "password": "maie"
  }
  ```

  then post localhost:3000/login:

  ```JSON
  {
    "email": "onu@mets.ee",
    "password": "maie"
  }
  ```

  Then we get Token.  
   Then lets copy that token to Headers Auth > Bearer

  ### Who can see users, how controll users

  isAdminMiddleware – pass getal users through that

### Connecting with mysql

Use MySQL driver (if does not work, use ver 2)
Make myssql queries
Make database.ts and import mySQL driver

### Tests

mocha
Chai
Superttest – data for tests
Tests folder
For testing purposes leave in `index.ts` only

```javascript
import app from './app';
import config from './config';

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
```

`npm run test`

This ise the short version of test:

```javascript
describe('indicators controller', () => {
  describe('GET /indicators', () => {
    it('responds with code 401 and error message', async () => {
      const response = await request(app).get('/indicators');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
  });
});
```

What we expect:  
`expect(response.body).to.be.a('object');`  
status code (find in codes folder):  
`expect(response.statusCode).to.equal(401);` this is from codes folder
key:  
`expect(response.body).to.have.key('error');`
message:  
`expect(response.body.error).to.equal('No token provided');` this is from isLoginMiddelware

## Problems

Biggest problem was after first stage e.g. after second lesson, when api just didnt work. I could'nt find the reason. It took couple of days. Finaly i went back to the beginning, and made all again. I took example code and compared them row by row and then found mistake. I found a little mistake with one variable – i wrote just one character wrongly.
