# Gym Management System

This is a management application for gyms. It allows gym managers to keep track of members, class bookings, and more.

## Technologies Used
<img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" width="50">  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/189716058-71f74b6f-5936-40b5-92e3-00381e35ccb9.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183890595-779a7e64-3f43-4634-bad2-eceef4e80268.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" width="50">


## Installation

To install the management system, follow these steps:

1. Clone the repository
2. Enter the `gym-customer` and `server-gym` directories
3. Install all dependencies with `npm install` (use a node.js version between 16 and 18)

## Configurations

> [!IMPORTANT]
> Before launching the application, some small steps are required:

1. Open the file `server-gym/config.env`
2. Enter your Mongo DB address in the `DATABASE` line (It is recommended to add this information to create a database with a meaningful name: `fitness?retryWrites=true&w=majority`)
3. Enter the password of the account used to access the DB in the `DATABASE_PASSWORD` line
4. Enter a secret key to encrypt passwords in the `JWT_SECRET` line
5. Enter the duration for the jwt and the cookie in the `JWT_EXPIRES_IN` and `JWT_COOKIE_EXPIRES_IN` lines

Your `config.env` should look similar to this (you can also delete the email-related fields):

```
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://mat:<password>@fitness.mssaad321kns.mongodb.net/fitness?retryWrites=true&w=majority
USERNAME=mat
DATABASE_PASSWORD=11321312213123123214


JWT_SECRET=la-tua-password
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
````

## Start

To start the application, simply run these two commands in the two different directories:
+ In `Gym_customer_client` use `npm run start:mock`
+ In `server-gym` use `npm run start`

## Extra documentation

Through the link below, you can view all the endpoints for the different operations:
https://documenter.getpostman.com/view/22669479/2sA3QwcA8c

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Contacts

For questions or feedback, contact me at: mattia.lavecchia05@email.com

