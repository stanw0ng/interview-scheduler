# Interview Scheduler

## Description

Interview Scheduler is a single-page React application designed to streamline the process of scheduling appointments between students and interviewers. The app utilizes React's built-in hooks and custom hooks to add, edit, and delete appointments in real-time, providing an intuitive user experience. Most importantly, this project prioritizes test-driven development by using tools like Storybook, Jest, and Cypress to ensure that the app is thoroughly tested and reliable.

## Setup

1. Install dependencies with `npm install`.
2. Clone this repo and follow the README to install and setup the API server/database
3. Start the Interview Scheduler in the root folder using `npm start`
4. Start the cloned Scheduler API in its root folder using `npm start`

** Note at its current state, Interviewer Scheduler MUST have the scheduler and api to run concurrently to be fully operational. 

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- Axios
- Babel/core
- Babel-loader
- Classnames
- Eslint
- Normalize.css
- React
- React-dom
- React-scripts
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Sass
- Prop-types
- React-test-renderer

## Work in Progress

- Implement useReducer instead of useState
- WebSocket server support
- Deploying Server to Railway
- Deploying Client to Netlify

## Screenshots


![Landing Page]()
_This is the home page. Creating an appointment begins with clicking the + button available at each time slot. Additionally a different day can be picked on the left side of the page. Notice how each day also displays how many vacant time slots are avaiable to make an appointment._

![Adding Appointment]()
_After clicking on the + button, users are presented with this form._

![Appointment Entry]()
_Once a name and an interviewer is selected, the user can click "Save" to schedule an appointment and store it in the database._

![Saving Appointment]()

![Saved Appointment]()
_After the appointment is saved, the appointment will be visible in the schedule. Users can edit their appointments when clicking the pen and paper icon or delete their appointment when clicking the trash icon._

![Delete Appointment]()
_Clicking on the trash icon mentioned above,users can to delete their appointments._

![Delete Confirm]()
_Users will need to confirm if they want to delete an appointment or not._

![Deleting Appointment]()