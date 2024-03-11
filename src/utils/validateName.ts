const validationRegExp = /^[a-zA-Z0-9 _-]+$/;

export function validateName(name: string): string | void {
  if (name === "." || validationRegExp.test(name)) {
    return;
  }

  return "Server name must only contain alphanumeric characters, ' ', '-' and ''";
}
