# Calculator Web App

This project is a web application for performing basic arithmetic calculations and managing user authentication. It includes features such as user sign-up, login, calculation history, and user information.

## Features

- User authentication with email/password and Google OAuth
- Arithmetic calculations (addition, subtraction, multiplication, division)
- Calculation history tracking
- User information display

## Technologies Used

- React.js
- Firebase (Firestore, Authentication, Cloud Functions)
- Material-UI

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/umairdev1/react-calculator-app-with-cloud-function.git
```

### 2. Navigate to the Project Directory

```bash
cd calculator-app
```

### 3. Install Dependencies

- Install the necessary dependencies using npm:

```bash
npm install
```

### 4. Configure Firebase

- Create a Firebase project on the Firebase Console.
- Enable Firestore, Authentication, and Cloud Functions services.
- Copy the Firebase configuration object (firebaseConfig) from the Firebase console.
- Paste the configuration object into the firebaseConfig.js file located in the src directory.

### 5. Deploy Cloud Function

- Open a terminal and navigate to the functions directory within your project.

```bash
cd functions
```

- Install Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

- Log in to Firebase CLI:

```bash
firebase login
```

- Initialize Firebase project:

```bash
firebase init
```

- Follow the prompts to set up your project, selecting the Firebase project you created earlier.
- Once the initialization is complete, deploy the Cloud Function:
  ```bash
  firebase deploy --only functions
  ```
- The Cloud Function should now be deployed and accessible.

### 6. Run the Application

```bash
npm run start
```

The application should now be running locally on http://localhost:3000.

### 7. Access the Application

- Open your web browser and navigate to http://localhost:3000 to access the application.

### 8. Author

- This application was created by Umair Saleem.
- For any inquiries, please contact me at umairdev4@gmail.com.
