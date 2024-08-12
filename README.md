## Getting Started

**1 - Install dependencies**: Run `npm install` in the root directory to install the required packages listed in the package.json file.

**2 - Set up environment variables**: Assign the Google Gemini API Key and Firebase variables in the .env file located in the root directory.

- Google Gemini: You can get a Google Gemini API Key at [Google Dev](https://ai.google.dev/gemini-api?_gl=1*3uqr5z*_up*MQ..&gclid=CjwKCAjw2dG1BhB4EiwA998cqFEKGECQTtKlQ9oQmMMvRO3WzMTfPkVGU-3HTz9NkeCUuB8XU7mYPBoCDQIQAvD_BwE)
- Firebase variables: Create a new project at [Firebase.google](https://firebase.google.com/) and copy all the relevant variable values provided by Firebase to the .env file (keep the NEXT_PUBLIC to it can be read on the client side)


**3 - Configure Firestore Database**

After creating a Firestore Database with a collection called "chats," on the **rules tab**, modify the `allow read, write: if false` to `allow read, write: if true` to enable read and create operations on the database.
