# NutriPal
NutriPal is a user-friendly diet information website that simplifies the daily diet logging process. With NutriPal, users can effortlessly record their meals by inputting simple descriptive sentences about what they ate for breakfast, lunch, or dinner. Our innovative application takes these user inputs and sends them to ChatGPT, a powerful language model, along with additional instructions. ChatGPT then generates insightful responses in the form of a JSON object, providing interpreted nutrition intake data based on the user's input. Finally, we store this valuable nutrition data securely into our MongoDB Atlas database, ensuring that users can easily track and analyze their dietary habits over time.

## Technologies used
- React
- Express.js
- openAI Api
- Google Cloud Platform
  - Google Compute Engine
  - Firebase
- MongoDB Atlas
## Features
User-friendly interface for logging meals
Integration with ChatGPT for interpreting nutrition data
Secure authentication and data storage using Firebase and MongoDB Atlas
Data visualization for tracking dietary habits over time
## Getting started
To get started with NutriPal, follow these steps:

1. Clone the repository to your local machine
2. Install dependencies by running `npm install` or `yarn` in both directories
3. In the root directory, create a .env file with the following environment variables:
   1. frontend
       - REACT_APP_OPENAI_API_KEY
       - REACT_APP_BACKEND_API
   2. backend
      - CONNECTION_URL: the connection string to your MongoDB Altas
4. Run the application by running `npm run` or `yarn start` in the root directory
