import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addTask(user: User) {
    await this.request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item: "Learn Playwright",
      },
      headers: {
        authorization: `Bearer ${user.getAccessToken()}`,
      },
    });
  }
}
