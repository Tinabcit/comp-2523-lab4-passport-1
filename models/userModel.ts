export type Role = "user" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;   // optional for GitHub users
  githubId?: string;   // optional for local users
  role: Role;
};
const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    // const user = database.find((user) => user.email === email);
    // if (user) {
    //   return user;
    // }
    // throw new Error(`Couldn't find user with email: ${email}`);
    return database.find((user) => user.email === email);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    // const user = database.find((user) => user.id === id);
    // if (user) {
    //   return user;
    // }
    // throw new Error(`Couldn't find user with id: ${id}`);
    return database.find((user) => user.id === id);
  },
};

export { database, userModel };
