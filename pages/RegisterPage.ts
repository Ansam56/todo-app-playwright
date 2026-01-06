import { Page } from "@playwright/test";
import User from "../models/User";
export default class RegisterPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //elements
  private get firstNameInput() {
    return '[data-testid="first-name"]';
  }

  private get lastNameInput() {
    return '[data-testid="last-name"]';
  }

  private get emailInput() {
    return '[data-testid="email"]';
  }

  private get passwordInput() {
    return '[data-testid="password"]';
  }

  private get confirmPassword() {
    return '[data-testid="confirm-password"]';
  }

  private get submitButton() {
    return '[data-testid="submit"]';
  }

  //methods or steps
  async load() {
    await this.page.goto("/signup");
  }

  async register(user: User) {
    await this.page.fill(this.firstNameInput, user.getFirstName());
    await this.page.fill(this.lastNameInput, user.getLastName());
    await this.page.fill(this.emailInput, user.getEmail());
    await this.page.fill(this.passwordInput, user.getPassword());
    await this.page.fill(this.confirmPassword, user.getPassword());
    await this.page.click(this.submitButton);
  }
}
