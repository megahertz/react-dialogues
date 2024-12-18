export function stringifyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (!error) {
    return 'Unknown error happened';
  }

  if (typeof error === 'object') {
    return JSON.stringify(error);
  }

  return String(error);
}
