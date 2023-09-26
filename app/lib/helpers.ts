export function getInitials(name: string): string {
  const initials = (name.match(/\b[a-zA-Z]/g) || []).map((char) => char.toUpperCase());

  if (initials.length <= 2) {
    return initials.join('');
  }

  return `${initials[0]}${initials[1]}`;
}
