## Full-Stack eCommerce Platform
## Built by Macray Curran, Hunter Ashburn, and Yashar Bakhshaeisarand

## Overview

This full-stack eCommerce platform was developed as part of a semester-long project for the CSE 5234 graduate-level course at The Ohio State University. The project's goal was to design a robust application capable of managing customer and product information, handling user inputs for payment and shipping details, and tracking product inventory. The front end is built using React.js, while the back end is powered by Node.js. The application can be hosted on AWS EC2 or locally, using AWS NoSQL DynamoDB for data storage.

## Technologies Used

- React.js
- Node.js 
- Bootstrap
- AWS SDK


## Setting Up AWS Credentials

To use this application, you need to provide AWS credentials. These credentials should be stored in a `.env` file located in the `~/cse5234/server` directory. Since this repository is public, the credentials are not tracked by Git. Make sure to include the following AWS credentials:

 - AWS_ACCESS_KEY_ID
 - AWS_SECRET_ACCESS_KEY
 - AWS_REGION

## How to Run

1. Get application dependencies:

    ```
    ~/cse5234$ npm install
    ```

2. Start the front end:

    ```
    ~/cse5234$ npm start
    ```

3. Start the back end:

    ```
    ~/cse5234/server$ node server.js
    ~/cse5234/bank-microservice$ node bank.js
    ~/cse5234/kafka$ node producer.js
    ```


