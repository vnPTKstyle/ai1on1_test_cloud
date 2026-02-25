/**
 * Kiểu user khi lưu bằng file JSON (không dùng TypeORM).
 */
export interface UserJson {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
