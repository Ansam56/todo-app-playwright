import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";
export default class RegisterPage {
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;

  constructor(
    page: Page,
    request?: APIRequestContext,
    context?: BrowserContext
  ) {
    this.page = page;
    this.request = request;
    this.context = context;
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

  async registerUsingTheApi(user: User) {
    const res = await new UserApi(this.request!).register(user);
    // console.log(await res.json());
    const resBody = await res.json();
    const access_token = resBody.access_token;
    const userID = resBody.userID;
    const firstName = resBody.firstName;

    user.setAccessToken(access_token);

    //console.log(accessToken, userID, firstName);

    await this.context!.addCookies([
      {
        name: "access_token",
        value: access_token,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
    ]);
  }
}
