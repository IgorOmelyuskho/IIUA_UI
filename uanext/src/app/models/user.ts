// when logged in, the server sends such an answer
export class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string; // vendor or investor
}
