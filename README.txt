Twitter Clone Project Setup Guide

Prerequisites:

    Node.js (v16+)

    PostgreSQL installed and running

    MongoDB installed and running

    pgAdmin 4 (recommended to manage PostgreSQL visually)

    MongoDB Compass (recommended to manage MongoDB visually)

    Git
-----------------------------------------------------------------------------------------------------

1. Clone the repo

git clone <your-repo-url>
cd TwitterApplication/server
-----------------------------------------------------------------------------------------------------

2. Setup environment variables

Create a .env file in the server folder with the following:

MONGODB_URI=mongodb://localhost:27017/twitter_clone
DATABASE_URL=postgres://<pg_user>:<pg_password>@localhost:5432/twitter_clone
PORT=3000

Replace <pg_user> and <pg_password> with your PostgreSQL credentials.
-----------------------------------------------------------------------------------------------------

3. Install dependencies

npm install
-----------------------------------------------------------------------------------------------------

4. Setup databases
PostgreSQL

    Open pgAdmin 4 and connect using the same credentials (<pg_user> and <pg_password>) you set in .env

    Create a new database called twitter_clone

    Run migrations to create tables:

npm run migrate

MongoDB

    Open MongoDB Compass and connect to mongodb://localhost:27017

    Create or ensure a database named twitter_clone exists

    MongoDB will create collections automatically on data insertion
-----------------------------------------------------------------------------------------------------

5. Seed databases with sample data

Make sure PostgreSQL and MongoDB are running.

Run:

npm run seed:pg    # Seeds PostgreSQL tables with users & followers
npm run seed:mongo # Seeds MongoDB with sample tweets
-----------------------------------------------------------------------------------------------------

6. Start the API server

npm run start

Server runs on http://localhost:3000
-----------------------------------------------------------------------------------------------------

7. How to check data (optional)

    PostgreSQL: Use pgAdmin 4 or the psql command-line tool to query tables:

SELECT * FROM users;
SELECT * FROM followers;

    MongoDB: Use MongoDB Compass to view the tweets collection in the twitter_clone database.