# Submission for Expert Web Developer Bootcamp Coding Camp

## Challenge

The assignment for this expert class was to create an online restaurant catalogue service. This assignment will be integrated with the materials obtained from this expert class and is divided into three times.

### First submission

#### Features Overview
1. App Bar (Navigation Bar):
- Displays the app name or brand logo.
- Contains a navigation menu with links to:
   Home - links to the root domain.
   Favorite - placeholder link (#) for future implementation.
   About Us - links to a personal profile on LinkedIn, GitHub, or social media.
- Includes a functional navigation drawer for mobile screens.

2. Hero Element (Jumbotron):
- Displays a hero image chosen from the project’s provided assets (src/public/images/hero).
- Ensures the hero image is full-width:
At least 1000px width on viewports ≥ 1200px.
Full-width for viewports < 1200px.

3. Restaurant List:
- Shows a list of restaurants using pre-provided data (src/public/data/DATA.json).
- Each entry displays the restaurant’s name, image, and at least one of the following: city, rating, or a brief description.

4. Footer:
- Contains footer content at the bottom of the page.
- Example text could include copyright information, such as “Copyright © 2020 - Hunger Apps.”

5. Responsive Design:
- Mobile-first design approach, optimized for all screen sizes (mobile, tablet, desktop).
- Layout uses CSS Grid or Flexbox, avoiding float-based layouts.
- Ensures dynamic viewport scaling based on device screen size.

6. Accessibility:
- Fully navigable with keyboard controls (e.g., hamburger menu and links).
- Implements “Skip to Content” for quick navigation.
- Includes alternative text for all images, with empty alt attributes for decorative images.
- Touch targets have a minimum size of 44x44px and sufficient spacing to prevent overlap.
- Uses semantic HTML elements for structure and landmarking.

### Second submission

#### Features Overview
1. Main Page (Restaurant List):
- Displays a list of restaurants sourced from the API [Restaurant API Endpoint](restaurant-api.dicoding.dev).
- Each restaurant entry shows its name, image, and at least one detail (city, rating, or description).
- Includes a call-to-action (CTA) link to each restaurant’s detail page.
- Retains the hero element from the first submission.

2. Restaurant Detail Page:
- Provides comprehensive details for a selected restaurant, including:
  Name, image, address, city, description
  Food and drink menus
  Customer reviews
- Contains a favorite button to add or remove the restaurant from a favorites list, stored in IndexedDB.

3. Favorite Restaurants Page:
- Accessible via the navigation menu.
- Displays the user’s favorited restaurants with information (name, image, city, rating, or description).
- Each item links to the restaurant's detail page.

4. Native Capability:
- Full offline functionality, with all assets and API data cached using a caching strategy (e.g., Workbox).
- Displays an "Add to Home Screen" option with a custom icon for the home and splash screens.

5. Code Quality:
- Code quality is maintained with ESLint, using the eslint-config-dicodingacademy configuration.
- The project must pass all linting checks with no errors.

6. Additional Requirements from Submission #1:
- Maintains previous criteria, including responsiveness, accessibility, and consistent app bar and footer design.

7. Optional Enhancements:
- Adding a customer review submission form on the restaurant detail page.
- Implementing Web Components using native Custom Elements.
- Loading indicators while fetching data from the server and user feedback on failed HTTP requests.

### Third submission

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox & grid
- Media query

## Preparation for work

- I put all the things I will use for styling in the style-guide file.
- The hero section is already in the public/images/heros folder.
- For restaurant data needs, it is in the public/data folder
- For web form templates available in the src/design folder

## Author

- LinkedIn - [Muhammad Fachrezi Barus](https://www.linkedin.com/in/muhammad-fachrezi-barus/)
- Frontend Mentor - [@Fbeye04](https://www.frontendmentor.io/profile/Fbeye04)
- GitHub - [@Fbeye04](https://github.com/Fbeye04)
