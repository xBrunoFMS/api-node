import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

export class user{
  name:string;
  email:string;
  user:string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getUsers')
  async testPythonCall(): Promise<any> {
    try {
       const users = await this.appService.getUsers('http://127.0.0.1:5000/getUsers');
       return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('user')
  async create(@Body() createUser: user): Promise<user[]> {
    return await this.appService.createUser(createUser);
  }
}

