enum ROLE {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

interface User {
  name: string;
  email: string;
  role?: ROLE;
}

export { ROLE, User };
