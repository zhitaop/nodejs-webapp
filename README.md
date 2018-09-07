# nodejs-webapp
## An appointment management webapp using nodejs 

This is a web-based appointment management system originally developed for one of my subject at university.
I later implemented more features and improved code structure design to use it as one of my side project for showcase.
This is a personal project, I implemented both front-end and back-end on my own. 

## Technologies 
* Front-end: Bootstrap framework, javascript, HTML & CSS
* Back-end: Various Node.js modules, Express.js framework, MySQL database

## Basic introduction
A webapp for online dog grooming appointments

## Functionalities:
* Users can register and login with email address.
* Users can edit their personal details after register.
* Users can add and edit information about one or more dogs they own.
* Users can make appointments for their dogs by selecting from a list of available time slots.
* Users can cancel or re-schedule appointments they made.
* System can generate automatic email reminders when a new appointment is made, or 24 hours prior to the appointment time.
* Admin can view all appointments in the system.

## Future improvement
* The Express session module used in the app.js intended to prevent unauthorised access to user pages, but it doesn't work entirely properly. Users can't access user pages by entering the "../user/userid" URL without loging in. However, they are able to access other users' pages by entering the corresponding URL after they log in to their own.
* The login authntication is implemented by storing the user's password in database in plain text and comparing the password user input when loging in. Improvement can probably be made about this naive approach, like using the [Passport.js](http://www.passportjs.org/) middleware
