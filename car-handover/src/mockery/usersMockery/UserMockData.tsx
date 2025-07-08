export interface UserMock {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const users: UserMock[] = [
  {
    username: "aliceadmin",
    email: "alice.admin@example.com",
    password: "AdminPass123!",
    isAdmin: true,
  },
  {
    username: "bobnormal",
    email: "bob.normal@example.com",
    password: "NormalPass123!",
    isAdmin: false,
  },
  {
    username: "charlieadmin",
    email: "charlie.admin@example.com",
    password: "AdminPass456!",
    isAdmin: true,
  },
  {
    username: "diananormal",
    email: "diana.normal@example.com",
    password: "NormalPass456!",
    isAdmin: false,
  },
];
