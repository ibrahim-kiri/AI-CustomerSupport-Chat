## Getting Started

Install all the packages with `npm install` from the roo directory.

Assign the Google Gemini and Firebase variables in the .env file located in the root directory:

### Google Gemnini:

You can get a Google Gemini Api key key at [Google Dev](https://ai.google.dev/gemini-api?_gl=1*3uqr5z*_up*MQ..&gclid=CjwKCAjw2dG1BhB4EiwA998cqFEKGECQTtKlQ9oQmMMvRO3WzMTfPkVGU-3HTz9NkeCUuB8XU7mYPBoCDQIQAvD_BwE)

### Firebase variables:

Create a new project at [Firebase.google](https://firebase.google.com/) and copy all the variables provided by Firebase to the .env file.

Afterwards, set up a Firestore Database with a collection called 'chats'. On the **rules tab**, modify the `allow read, write: if false` to 'if true' to allow read and create operations on the database.
