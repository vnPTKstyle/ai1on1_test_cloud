# testCloudRun

- **フレームワーク**: NestJS 10.0.0  
- **ランタイム**: Node.js 20.x  
- **言語**: TypeScript 5.1.3  
- **ORM**: TypeORM 0.3.20  
- **データベース**: MySQL 8.0+  
- **認証**: Passport.js (JWT, Local)

## セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数**
   ```bash
   cp .env.example .env
   ```
   `.env` で MySQL の接続情報と `JWT_SECRET` を設定してください。

3. **MySQL**
   - MySQL 8.0+ を起動し、`.env` の `DB_*` に合わせてデータベースを作成してください。
   - 例: `CREATE DATABASE test_cloud_run;`
   - テーブル作成は **migration** で行います:
     ```bash
     npm run migration:run
     ```
   - 新規マイグレーション生成: `npm run migration:generate -- src/migrations/TênMigration -d src/data-source.ts`  
   - ロールバック: `npm run migration:revert`

4. **起動**
   ```bash
   npm run start:dev
   ```
   本番ビルド: `npm run build` → `npm run start:prod`

## API

| Method | Path | 説明 |
|--------|------|------|
| GET | /api/users | ユーザー一覧 |
| GET | /api/users/:id | ユーザー詳細 |
| POST | /api/users | ユーザー作成 |
| PUT | /api/users/:id | ユーザー更新 |
| DELETE | /api/users/:id | ユーザー削除 |
| POST | /api/auth/register | 新規登録 (name, email, password) |
| POST | /api/auth/login | ログイン (email, password) → JWT |
| GET | /api/auth/me | 認証ユーザー取得 (Authorization: Bearer &lt;token&gt;) |

フロント: http://localhost:8080/index.html （ユーザー一覧・追加・編集・削除）
