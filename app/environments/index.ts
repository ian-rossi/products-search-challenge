// These functions can be evolved to change according to environments, for example.
export const getBaseURL = (): string => 'http://localhost:3000/api/';
export const getCompleteURL = (suffix: string): string => getBaseURL() + suffix;