// when logged in, the server sends such an answer
export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}
