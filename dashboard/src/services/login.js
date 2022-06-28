import http from './base';

export const checkCredentials = async (email, password) => {
  const response = await http.post('/login', {
    email,
    password,
  });
  return response;
}