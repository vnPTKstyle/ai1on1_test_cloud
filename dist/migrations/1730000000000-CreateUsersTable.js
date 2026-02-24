"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1730000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1730000000000 {
    constructor() {
        this.name = 'CreateUsersTable1730000000000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createIndex('users', new typeorm_1.TableIndex({
            name: 'IDX_users_email',
            columnNames: ['email'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users', true);
    }
}
exports.CreateUsersTable1730000000000 = CreateUsersTable1730000000000;
//# sourceMappingURL=1730000000000-CreateUsersTable.js.map