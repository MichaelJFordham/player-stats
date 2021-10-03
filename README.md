# player-stats

A reusable football player statistics component.

# Setup Instructions

Install Live SASS Compiler from the VS Code extension store to compile SASS files to CSS live: https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass

After that's installed, you may need to restart your VS Code application to see a 'Watch My Sass' button appear in the bar at the bottom of the screen. When you can see that option, click it and CSS will automatically be generated from the Sass input file.

To run the code, you'll need to start it on a live server. This can be done using the Live Server VS Code extension: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Click the 'Go Live' button at in the bar at the bottom of the screen to automatically start running the code on a local server.

# Notes on build

The app fetches the JSON file provided in the challenge from the local directory, and autopopulates the select input field with the players' names and sets each option with their ID. This is all done in the index.js file, which also controls the event for when a player selection is made.

Once a player is picked, the player-card element is inserted into the DOM, and the player selected is passed in as an attribute.

In the playerCard.js file, you'll see the PlayerCard is its own Web Component. Coming from a background using frameworks like Angular - and considering your points about reusability - it was clear that the player card area which shows their information could be reusable in the future (e.g. in a team of the year list). Therefore, I looked into building it as a Web Component. This was the first time I had used a native Web Component - I'm more experienced building these types of things with frameworks which simplify this process quite a bit.

In the spirit of reusability, I wanted to scope styling of the player card component to just that component. Therefore, in-line CSS is used in that file rather than SASS. I could have opted for a SASS file - however it would've meant using the @import mechainism which could hamper the performance of the front-end: https://gtmetrix.com/avoid-css-import.html

The player card has an aria-live attribute which will inform screen readers of the data being changed without the page reloading - which will happen when a user selects a new player to view.

The PlayerCard component observes the person attribute which will change when another player is selected. Once that happens, the component will automatically re-render the component with the updated player data.

The set person function inserts the player information into the template HTML elements.

For stats in the table like goals per match and passes per minute, there are functions which calculate that - see calculateGoalsPerMatch and calculatePassesPerMin. These functions check if the stats in use are zero to protect against the app dividing by zero. The functions round the calculated value to two decimal places.

The sprite image is controlled by the getClubLogoPosition which takes the clubId as a parameter. Depending on the club, different coordinates will be passed back which will line the relevant club's crest up with the size of the element.

The club crest element is set as a span with an aria-label acting as the alt text, as the sprite has to be set as a background (and an img element would display the src image over the top of the background if provided, or if no src was provided it would show alt text over the background). A span element was chosen based off of advice found here: http://www.davidmacd.com/blog/alternate-text-for-css-background-images.html

# Semantics and accessibility

Where possible, semantic HTML was preferred due to its naturally good behaviour for those who rely on assistive technology. For example, the select input was used for player selection. An img element was used when displaying the image of the player.

The one key area where the natural semantic element could not be used was the club crest (for reasons mentioned above). In this case, I did my best to ensure that the image displayed in the background still supplied an accurate aria-label.

# Testing

The application was tested on Chrome, Firefox and Edge on a Mac.

Accessibility was tested automatically via Google Lighthouse, and manually via the in-built screen reader tool VoiceOver.
