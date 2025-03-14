# NomNom

## App Icon
![NomNom App Icon](./frontend/public/App_Icon.svg)


## Description
NomNom is a social media platform that combines recipe discovery and ingredient tracking. It helps users explore new meals, manage their ingredients efficiently, and engage with a community of cooking enthusiasts.


## Setup instructions

It is recommended to use VS Code.

### Obtaining the code

Inside your folder of choice, clone the repository, and enter.

```
git clone https://github.com/WuJessica7/NomNom
cd NomNom
```

### Backend
#### Preparing the database

Please create a MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas/register).

Read the terms of service, or don't. Skip the personalization page in the bottom right.

When reaching the page "Deploy your cluster", select "Free" and click "Create Deployment" in the bottom right.

You should hopefully be faced with a screen that says "Connect to Cluster0" or anything you named your cluster. You'll want to create a database user here with a password... you'll need this username and password later. Once you do, click "Choose a Connection Method".

Click "Drivers." Apply the newest version of Node.js; we did 6.7 or later.

You might need to wait a minute, but soon you'll get your awesome CONNECTION STRING! This will be personalized to you; don't leak it! It'll look something like this:

```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hna5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Of course, instead of USERNAME, you'll have your database username there. As for PASSWORD, later you can put the actual password you assigned to your database user earlier.

Copy this connection string. 

Click "Done" in the bottom right.

To the left, look for a section titled "Security". Click on QuickStart. Scroll down to a section that states, "Add entries to your IP Access List." Add an IP Address "0.0.0.0". This allows any IP address to access the database. 

We're done with MongoDB Atlas. Return to your repository. Create a .env file inside the backend repository in the way you like.

```
cd backend
touch .env
```

Inside this file, define a variable MONGODB_URI as follows using the connection string still copied in your clipboard. Make sure your username and password for your database user created earlier are in the USERNAME and PASSWORD fields, you can remove the "<>" signs. While you're at it, also create a cool secret key assigned to JWT_SECRET; this can be anything you want!

```
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hna5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=yesanything!
```

Save your .env file. The hard stuff is over. 
Run the following commands to get the backend ready on port 5000. 'npm run populate' gets you some starter recipes in the database, and 'npm run dev' gets your backend fully running!

#### Setup (Backend)
```
npm install
npm run populate
npm run dev
```

### Frontend
#### Setup (Frontend)

Now setup your frontend by going to a new terminal.

```
cd frontend
npm install
```
#### Running
```
npm start
```
You should be ready to go now! Hopefully it (slowly) opens automatically. If not, it's waiting for you in localhost:3000 on your browser.

## Contributors
Risa Sun (risasun)\
Diego Paz (dpaz52418)\
Dohyun Kim (dhkim142)\
Jessica Wu (WuJessica7)

## Additional Information
NomNom was made as a project for CS35L taught by Professor Paul Eggert at UCLA in Winter 2025.
