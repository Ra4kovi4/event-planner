EVENT PLANNER APP

Built with Vite and React

git clone <https://github.com/Ra4kovi4/event-planner.git>
Install the project dependencies:

npm install
To start the application:

npm start
Now, open http://localhost:5174/ to view it in the browser.

Backend Repository
https://github.com/Ra4kovi4/event_planner_backend.git

Home Page:
On this page, all available events are displayed. Each event is presented with an image, title, description, location, date, time, category, and priority level.

Home Page - Step 1:
Added the ability to sort events by title and description through a search field. The search is performed character by character. Normalization of titles and filtering fields has been implemented to make the search case-insensitive.

Additionally, events can be filtered based on the selected category and sorted by name, date, or priority. There is also a button next to it to add a new event, which redirects to the event creation page.

Home Page - Step 2:
When displaying a single card, a button appears on hover to navigate to the individual event page if the event's date is in the future. If the date has already passed, it's not possible to navigate to the page, and the button is disabled with the text "Expired".

Home Page - Step 3:

Event Page:
The event page displays information about the event along with two buttons. One button deletes the event, and the other navigates to the event editing page. There is also a button to return to the main events page.
Event Page - Step 1:

Create Event and Edit Event Page:
These pages contain a form necessary for creating and editing events.
Create Event and Edit Event Page - Step 1:
The form fields undergo validation during form completion. After submitting the form, it returns to the main page when creating a new event or to the event page if editing an existing one.
