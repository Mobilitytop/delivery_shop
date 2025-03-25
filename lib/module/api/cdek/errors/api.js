"use strict";

export class ApiError extends Error {
  constructor(response, message) {
    super(message);
    this.response = response;
  }
}
//# sourceMappingURL=api.js.map