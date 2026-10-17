WEEK 3 TASK REPORT
Integrating JavaScript for Interactive User Experience

Student: Chetan Baviskar
Internship: Frontend Web Developer Intern
Project: FocusFlow — Interactive Productivity Dashboard
Technologies: HTML5, CSS3 and Vanilla JavaScript

1. Objective
The objective of this task was to improve a static webpage by integrating JavaScript-based interactions. The work demonstrates DOM manipulation, event handling, input validation, dynamic content updates and responsive user-interface behavior without relying on a JavaScript framework.

2. Project Overview
FocusFlow is a responsive productivity dashboard designed to help users organize small daily tasks. The page includes a hero section, feature cards, a task planner, a contact form and a responsive navigation bar. The interface uses a clean visual hierarchy, soft gradients, card layouts and subtle animations to create a polished user experience on desktop and mobile screens.

3. Interactive Features Implemented
The task planner lets users add a task after entering non-empty text. Each task can be marked complete or incomplete, and can also be deleted. A “Clear completed” action removes finished tasks. JavaScript recalculates the total task count, completed count and progress percentage whenever the list changes. The percentage is reflected in the progress bar and circular progress display.

A theme button switches between light and dark modes. The selected theme is saved in localStorage, so it can persist after a page refresh in the same browser. On smaller screens, the navigation menu opens and closes with a button, and closes automatically after a navigation link is selected. Toast notifications provide short feedback after common actions.

The contact form validates that the name has at least two characters, the email matches a basic email pattern, and the message contains at least five characters. Feedback is announced in the page instead of relying only on browser alerts. The form is a front-end demonstration and does not send data to a server.

4. HTML and CSS Integration
HTML5 semantic sections and accessible labels are used to organize the content. CSS provides the layout, typography, responsive breakpoints, hover states, animations and theme variables. A reduced-motion media query respects users who prefer less animation. The layout adapts from two-column desktop sections to a single-column mobile view.

5. Testing and Challenges
The main test cases include submitting an empty task, adding a valid task, toggling completion, deleting a task, clearing completed tasks, switching themes, opening mobile navigation, and submitting invalid or valid contact-form data. During implementation, care was taken to use textContent for user-entered task labels instead of inserting them as HTML, which reduces the risk of interpreting user input as markup. Progress calculations also handle an empty task list to avoid division-by-zero issues.

6. Conclusion
This task demonstrates how JavaScript can transform a static webpage into an interactive experience. The project combines DOM manipulation, event listeners, form validation, localStorage, responsive UI behavior and dynamic progress updates. Possible future improvements include saving tasks persistently, connecting the contact form to a backend, adding task deadlines and writing automated browser tests.
