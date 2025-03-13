# NomNom

## App Icon
![NomNom App Icon](./frontend/public/App_Icon.svg)


## Description
NomNom is a social media platform that combines recipe discovery and ingredient tracking. It helps users explore new meals, manage their ingredients efficiently, and engage with a community of cooking enthusiasts.


## Setup instructions

### Backend
#### Preparing the database

Please create a MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas/register).

Read the terms and service... or don't.

When reaching the page "Deploy your cluster", select "Free" and click "Create Deployment" in the bottom right.

You should hopefully be faced with a screen that says "Connect to Cluster0" or anything you named your cluster. You'll want to create a database user here with a password... you'll need this later. Once you do, click "Choose a Connection Method".

Click "Drivers." Apply the newest version of Node.js; we did 6.7 or later.

You might need to wait a minute, but soon you'll get your awesome CONNECTION STRING! This will be personalized to you; don't leak it! It'll look something like this:

```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hna5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Of course, instead of USERNAME and PASSWORD, it'll be the actual username and password you created for your database user earlier.

Copy this connection string and create a .env file inside the backend repository in the way you like.

```
cd backend
touch .env
```

Inside this file, define a variable MONGODB_URI as follows using the connection string still copied in your clipboard. While you're at it, also create a cool secret key assigned to JWT_SECRET; this can be anything you want!

```
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hna5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=yesanything!
```

Save your .env file. The hard stuff is over. Run the following commands to get the backend ready on port 5000.

#### Setup (Backend)
```
npm install
npm run dev
```

### Frontend
#### Setup (Frontend)
```
cd frontend
npm install
npm install react-icons
npm install sass
```
#### Running
```
npm start
```
You should be ready to go now! There's a handful of recipes waiting for you.

## Contributors
Risa Sun\
Diego Paz\
Dohyun Kim\
Jessica Wu

## Additional Information
NomNom was made as a project for CS35L taught by Professor Paul Eggert at UCLA in Winter 2025.
