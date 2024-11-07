# Backend for Medical Appointment System

This document contains instructions on how to run the backend for the Medical Appointment System, along with details about its features and functionalities.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Progress](#progress)
- [Models](#models)
- [Controllers](#controllers)
- [Additional Information](#additional-information)

## Installation

1. **Install Packages**  
   Run the following command to install the necessary packages:

   ```bash
   npm install

   ```

2. **Intialize local Database**  
    Run the following command to create tables in the database:

   ```bash
   npx sequelize-cli db:migrate

   ```

2. **Add Default data**  
    Run the following command to add data into tables:

   ```bash
   npx sequelize-cli db:seed:all

   ```


3. **Start the App**  
    Run the following command to install the necessary packages:
   ```bash
   npm run start
   ```

# Progress

Progress
User Registration

User Login

Update User Profile

Update User Role

Reset Password

Create Appointments

Update Appointments

List Appointments

Delete Appointments

Create Bookings

Update Bookings

List Bookings

Delete Bookings

Define Appointment Types
