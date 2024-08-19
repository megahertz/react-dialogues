export function cls(...classNames: unknown[]): string {
  return classNames.filter(Boolean).join(' ');
}
