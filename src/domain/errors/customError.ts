export class CustomerError extends Error {
  constructor(public readonly number: string, public readonly message: string) {
    super(message);
  }

  //factory method for error handling

static badRequest(message: string) {
  return new CustomerError('400', message);
}

static unauthorized(message: string) {
    return new CustomerError('401', message);
  }

  static forbidden(message: string) {
    return new CustomerError('403', message);
  }
  static notFound(message: string) {
    return new CustomerError('404', message);
  }
  static internalServer(message: string) {
    return new CustomerError('500', message);
  }


}
