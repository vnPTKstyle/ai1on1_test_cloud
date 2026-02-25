import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserJson } from './user-json.interface';

const DATA_DIR = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'users.json');

@Injectable()
export class UserService {
  private async readUsers(): Promise<UserJson[]> {
    try {
      const raw = await readFile(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e: unknown) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw e;
    }
  }

  private async writeUsers(users: UserJson[]): Promise<void> {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  }

  async findAll(): Promise<UserJson[]> {
    const users = await this.readUsers();
    return users.sort((a, b) => b.id - a.id);
  }

  async findOne(id: number): Promise<UserJson> {
    const users = await this.readUsers();
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<UserJson | null> {
    const users = await this.readUsers();
    return users.find((u) => u.email === email) ?? null;
  }

  async create(dto: CreateUserDto): Promise<UserJson> {
    const users = await this.readUsers();
    const existing = users.find((u) => u.email === dto.email.trim());
    if (existing) throw new ConflictException('Email đã tồn tại');
    const now = new Date().toISOString();
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const user: UserJson = {
      id,
      name: dto.name.trim(),
      email: dto.email.trim(),
      phone: dto.phone?.trim() || '',
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    await this.writeUsers(users);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserJson> {
    const users = await this.readUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    if (dto.email && dto.email !== users[idx].email) {
      const existing = users.find((u) => u.email === dto.email.trim());
      if (existing) throw new ConflictException('Email đã tồn tại');
    }
    const now = new Date().toISOString();
    users[idx] = {
      ...users[idx],
      ...(dto.name !== undefined && { name: dto.name.trim() }),
      ...(dto.email !== undefined && { email: dto.email.trim() }),
      ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
      updatedAt: now,
    };
    await this.writeUsers(users);
    return users[idx];
  }

  async remove(id: number): Promise<UserJson> {
    const users = await this.readUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    const [removed] = users.splice(idx, 1);
    await this.writeUsers(users);
    return removed;
  }
}
