import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCompanyIdOnCustomers1711895607331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "customers",
            new TableColumn({
                name: 'company_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'customers',
            new TableForeignKey({
                name: 'FKCompanyCustomers',
                referencedTableName: 'companies',
                referencedColumnNames: ['id'],
                columnNames: ['company_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customers', 'company_id')
        await queryRunner.dropForeignKey('customers', 'FKCompanyCustomers')
    }

}
