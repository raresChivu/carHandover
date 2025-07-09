export interface Notification {
  id: string;
  type: 'request' | 'assign';
  carId: number;
  carPlate: string;
  from: string; // email
  to: string; // email
  message: string;
  date: string;
  read: boolean;
}

export interface UserMock {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  notifications?: Notification[];
}

export const users: UserMock[] = [
  {
    username: "aliceadmin",
    email: "alice.admin@example.com",
    password: "AdminPass123!",
    isAdmin: true,
    notifications: [],
  },
  {
    username: "bobnormal",
    email: "bob.normal@example.com",
    password: "NormalPass123!",
    isAdmin: false,
    notifications: [],
  },
  {
    username: "charlieadmin",
    email: "charlie.admin@example.com",
    password: "AdminPass456!",
    isAdmin: true,
    notifications: [],
  },
  {
    username: "diananormal",
    email: "diana.normal@example.com",
    password: "NormalPass456!",
    isAdmin: false,
    notifications: [],
  },
];
