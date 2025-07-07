export function isEmailValid(email: string): boolean {
  const regex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isAllowedDomain(
  email: string,
  allowedDomains: string[],
): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return allowedDomains.includes(domain);
}

export function getEmailValidationMessage(
  email: string,
  allowedDomains?: string[],
): string {
  if (!isEmailValid(email)) {
    return "Please enter a valid email address.";
  }
  if (allowedDomains && !isAllowedDomain(email, allowedDomains)) {
    return `Email domain must be one of: ${allowedDomains.join(", ")}`;
  }
  return "";
}
