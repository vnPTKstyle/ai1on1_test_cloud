import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const name = process.env.NAME || 'World';
    return `Hello ${name}! <a href="/index.html">Quản lý User</a>`;
  }
}
