interface NewUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface User extends NewUser {
  id: number;
}

interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
}

export default { User, UpdateUser, NewUser};
