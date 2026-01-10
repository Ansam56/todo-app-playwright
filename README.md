# Playwright Todo Automation Project 

This project contains an automated testing suite for a Todo application using **Playwright** with **TypeScript**. It features **end-to-end (E2E)** tests and incorporates advanced testing techniques such as the **Page Object Model (POM)** and **API-driven setup**.

---

## Key Features

- **Advanced POM Implementation**: Clean separation of concerns using Page Object Model.
- **API-Driven Testing**: Faster test execution by utilizing API requests for pre-requisites (Registration & Task Creation).
- **Session Injection**: Automatic synchronization of API auth tokens with Browser Context via Cookies.
- **Dynamic Data Generation**: Realistic test data using `@faker-js/faker`.
- **Clean Code Practices**: Private selectors, modular classes, and shared utility models.
  
---

 ## How to Run the Project

1. Clone the repo:
   ```bash
   git clone https://github.com/Ansam56/todo-app-playwright.git
   cd todo-app-playwright/
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npx playwright test
   ```
   
