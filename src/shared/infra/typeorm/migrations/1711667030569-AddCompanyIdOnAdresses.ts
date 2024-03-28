import { TableColumn, MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddCompanyIdOnAdresses1711667030569 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "adresses",
            new TableColumn({
                name: 'company_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'adresses',
            new TableForeignKey({
                name: 'FKCompanyAddress',
                referencedTableName: 'companies',
                referencedColumnNames: ['id'],
                columnNames: ['company_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('adresses', 'company_id')
    }
}
