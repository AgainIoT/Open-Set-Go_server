export interface User {
  id: string;
  name: string;
  avatar: string;
  accessToken: string;
  orgs: {
    id: string;
    avatar: string;
  }[];
}
