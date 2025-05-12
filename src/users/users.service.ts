import { Injectable, NotFoundException } from '@nestjs/common';
import { ROLE } from 'src/interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'jhon@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'Jane@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Jack',
      email: 'jack@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: ROLE) {
    if (role) {
      const roleArr = this.users.filter((user) => (user.role as ROLE) === role);
      if (roleArr.length === 0) {
        throw new NotFoundException(`No users found with role ${role}`);
      }
      return roleArr;
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    const newUser = {
      // Spread user first to avoid id being overwritten
      id: userByHighestId.id + 1,
      ...user,
    };
    this.users.push({ ...newUser, role: newUser.role || 'INTERN' });
    return newUser;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    const updatedUsers = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...userUpdate,
        };
      }
      return user;
    });
    return updatedUsers;
  }

  delete(id: number) {
    const removeUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
