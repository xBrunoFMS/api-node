import { Injectable } from '@nestjs/common';
import { user } from './app.controller';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  
  private users: user[] = [
    {
      name: 'Bruno Ajuda Divina',
      email: 'bruno.teste@email.com',
      user: 'bruno.socorro'
    },
  ];

  getUser(): user[] {
    return this.users;
  }

  constructor(private readonly httpService: HttpService) {}
  async createUser (createUser: user): Promise<user[]> {
    const newUser: user = {
      name: createUser.name,
      email: createUser.email,
      user: createUser.user,
    };

    this.users.push(newUser);

    return this.users;
  }
  async getUsers(apiUrl: string): Promise<user[]> {
    try {

      const response = await lastValueFrom(this.httpService.get(apiUrl));
      this.users = response.data;

      console.log('Usuarios:', this.users);
    } catch (error) {
      console.error('Errouuu:', error.message);
      throw error;
    }

    return this.users;
  }
}
