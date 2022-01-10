## Description

Please include a summary of the changes and a link to which issue is fixed.

Closes #1: https://github.com/srachoor/44b4fd/issues/1#issue-1096811804

Summary of changes:
1. Connected to the Database using a .env file
2. Updated thunkCreators.js to sort the conversations after fetching them from axios. They were sorted based on id since id was automatically issued and was in chronological order. (Another option would be to sort this in the PSQL database to begin with or change the back-end business logic to return a properly sorted set of data);
3. Updated the Input.js file to import the fetchConversations function from store/utils/thunkCreators. I did this including it in the props for mapDispatchToProps and destructuring it from the props in Input.js. By invoking fetchConversations after postMessage will refresh the page automatically given that the Home Component has a useEffect function that refreshes anytime fetchConversations is invoked.
4. Updated thunkCreators.js to handle the return of the promise when invoking saveMessage(body). Only once the promise is returned with the data, will the setNewMessage() be dispatched and sendMessage() invoked.

After completing these changes, I re-seeded the DB and ran the cypress test, which resulted in all 4 tests passing.

## Notes on your approach and thought process

Please leave some notes explaining your thought process and your approach to solving this issue.

- To solve the order of the messages being displayed, I first reviewed the files in client project folder and I identified where the messages were programmed to be fetched from the back-end. This was in the thunkCreators. I figured it would be easiest to sort the messages as soon as they were received from the back-end.
- To solve the automatic refreshing issue, I had to understand where the messages were being displayed via JSX. I found that the messages were being loaded in the Message component of the ActiveChat component, which also had Header and Input components. The ActiveChat component was then called by the Home component and I noticed that the Home component had a useEffect() function that invoked fetchConversations() and would refresh whenever fetchConversations() was called.
- I realized that when the user types a message and hits enter, while the message may not get displayed right away, it did get stored in the back-end DB as the new message would appear after I refreshed the page. So the main task was invoking fetchConversations after the user submits a new message to refresh the Home component and have the message show up automatically. I did that by adding fetchConversations to the Input.js component and calling that function in the handleSubmit() function.
- I also noted that there was an error in the postMessage() function in thunkCreators. Within postMessage(), the method saveMessage(body) was being called and returning a promise to the variable named "data". After receiving the data, the postMessage() function would then try to invoke setNewMessage(data.message) and sendMessage(data,body). However, the issue here was that it would invoke those new functions before the promise was resolved and data had been returned from saveMessage(body). I changed it so that the following methods would only get invoked once the promise was fulfilled.
- I used console.log as a primary tool in figuring out what was being invoked when to ensure that the order of operations made sense.

## Further comments (optional)
