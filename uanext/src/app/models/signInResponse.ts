// when logged in, the server sends such an answer
export interface SignInResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}
