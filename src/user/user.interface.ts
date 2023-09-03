export interface User {
  id: string;
  name: string;
  avatar: string;
  accessToken: string;
  mail: string;
  orgs: {
    id: string;
    avatar: string;
  }[];
}
