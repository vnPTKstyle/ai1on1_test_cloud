"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
(0, dotenv_1.config)();
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test_cloud_run',
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.js')],
    migrations: [(0, path_1.join)(__dirname, 'migrations', '1730000000000-CreateUsersTable.js')],
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
});
//# sourceMappingURL=data-source.js.map