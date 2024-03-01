export default class UnauthorizedError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized Error';
    this.statusCode = 401;
  }
}
