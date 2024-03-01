interface IErrorMessage {
  message: string;
  details: string[];
}

export default (errors: string[]): IErrorMessage => {
  errors = errors.map((error) => {
    return `${error} must be unique`;
  });
  return {
    message: 'DuplicateFieldError',
    details: errors,
  };
};
