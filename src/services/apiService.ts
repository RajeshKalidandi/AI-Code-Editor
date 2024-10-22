import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAutocompleteSuggestions = async (code: string, language: string, cursorPosition: number) => {
  try {
    const response = await apiService.post('/autocomplete', { code, language, cursorPosition });
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
};

export const getCodeDiagnostics = async (code: string, language: string) => {
  try {
    const response = await apiService.post('/diagnostics', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error fetching code diagnostics:', error);
    return [];
  }
};

export const formatCode = async (code: string, language: string) => {
  try {
    const response = await apiService.post('/format', { code, language });
    return response.data.formattedCode;
  } catch (error) {
    console.error('Error formatting code:', error);
    return code;
  }
};

export const cloneRepository = async (repoUrl: string, branch: string): Promise<void> => {
  await apiService.post('/api/git/clone', { repoUrl, branch });
};

export const commitChanges = async (message: string): Promise<void> => {
  await apiService.post('/api/git/commit', { message });
};

export const pushChanges = async (): Promise<void> => {
  await apiService.post('/api/git/push');
};

export const getRefactoringSuggestions = async (code: string, language: string): Promise<string[]> => {
  const response = await apiService.post('/api/refactor', { code, language });
  return response.data.suggestions;
};

export default apiService;
