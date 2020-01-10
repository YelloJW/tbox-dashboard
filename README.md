# Therapy Box Web Dev Challenge
A MERN application (MongoDB, Express, React, Node) that allows users to login / sign up to access a dashboard of information. Including:
- The weather in their current location 
- A news article that is randomly selected from a BBC news rss feed
- Football results for a team input by the user
- A selection of uploaded photos
- A task list

# Setup
``` 
git clone git@github.com:YelloJW/tbox-dashboard.git
cd tbox-dashboard
npm install
cd client && npm install
cd .. && npm run dev
```
Runs on localhost:3000

# Improvements
- Error handling in photo and task routes
- Routes for Destroying photos / tasks
- Move routing actions into controller directory (create controllers for Auth, Weather, News etc.)
-	Log out functionality
- Scrape news article whilst on dahboard page to reduce loading time when navigating to news page
- peview selected photos (registration page and photo page)
-	Complete clothes section

