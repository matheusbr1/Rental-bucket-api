import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCompanyIdOnWorks1711898171551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "works",
            new TableColumn({
                name: 'company_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'works',
            new TableForeignKey({
                name: 'FKCompanyWorks',
                referencedTableName: 'companies',
                referencedColumnNames: ['id'],
                columnNames: ['company_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('works', 'company_id')
        await queryRunner.dropForeignKey('works', 'FKCompanyWorks')
    }

}
