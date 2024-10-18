# this document contains instructions on how to run the backend

# STEP 1:

type 'npm install' to install packages

# STEP 2: 

run commnand 'npx sequelize-cli db:migrate'

to intialise the database locally (will use sqlite)

# STEP 3

type 'npm run start'


the project will be available on port 3000 , make sure to adjust the port the frontend is running on in entrypoint.sh

to allow connections from frontend to reach the backend
