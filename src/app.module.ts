import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Tạm tắt kết nối DB để chạy trên Cloud Run khi chưa có MySQL (Cloud SQL)
    // Bỏ comment khi đã cấu hình DB_* và có DB reachable
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT || '3306', 10),
    //   username: process.env.DB_USERNAME || 'root',
    //   password: process.env.DB_PASSWORD || '',
    //   database: process.env.DB_DATABASE || 'test_cloud_run',
    //   autoLoadEntities: true,
    //   synchronize: false,
    //   retryAttempts: 5,
    //   retryDelay: 2000,
    // }),
    // UserModule dùng lưu file JSON (data/users.json), không cần DB
    UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
