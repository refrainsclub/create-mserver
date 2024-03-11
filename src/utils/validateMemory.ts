const validationRegExp = /^[0-9]+[MG]$/;

export function validateMemory(memory: string): string | void {
  if (validationRegExp.test(memory)) {
    return;
  }

  return "Memory must only contain a number ending with M (megabytes) or G (gigabytes)";
}
