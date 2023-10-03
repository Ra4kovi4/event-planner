# Event Planner App

This Event Planner application is built with Vite and React.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/Ra4kovi4/event-planner.git
    ```

2. Install project dependencies:

    ```
    npm install
    ```

3. Start the application:

    ```
    npm start
    ```

4. Open [http://localhost:5174/](http://localhost:5174/) in your web browser to
   view the application.

## Backend Repository

You can find the backend repository for this project at
[https://github.com/Ra4kovi4/event_planner_backend](https://github.com/Ra4kovi4/event_planner_backend).

## Home Page

On the home page, you will find a list of all available events. Each event is
displayed with the following details:

-   Image
-   Title
-   Description
-   Location
-   Date
-   Time
-   Category
-   Priority Level

![Home Page](/src/assets/image.png)

### Home Page - Step 1

-   Added a search field that allows you to find events by title and
    description.
-   The search is performed character by character.
-   Titles and filtering fields have been normalized to make the search
    case-insensitive.

![Home Page - Step 1](/src/assets/image-1.png)

-   You can filter events based on the selected category and sort them by name
    and date.
-   There's also a button to add a new event, which redirects you to the event
    creation page.

![Home Page - Step 2](/src/assets/image-4.png)

### Home Page - Step 2

-   When displaying a single card, a button appears on hover to navigate to the
    individual event page if the event's date is in the future.
-   If the date has already passed, it's not possible to navigate to the page,
    and the button is disabled with the text "Expired."

![Home Page - Step 3](/src/assets/image-5.png)

## Event Page

The event page displays information about the event along with two buttons:

-   One button deletes the event.
-   The other button navigates to the event editing page.
-   There is also a button to return to the main events page.

![Event Page](/src/assets/image-3.png)

### Event Page - Step 1

![Create Event and Edit Event Page](/src/assets/image-2.png)

## Create Event and Edit Event Page

These pages contain a form necessary for creating and editing events.

-   The form fields undergo validation during form completion.
-   After submitting the form, it returns to the main page when creating a new
    event or to the event page if editing an existing one.

---

Feel free to customize this README to match your project's specifics and
requirements.
