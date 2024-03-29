import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCompanyIdOnTrucks1711755171604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "trucks",
            new TableColumn({
                name: 'company_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'trucks',
            new TableForeignKey({
                name: 'FKCompanyTrucks',
                referencedTableName: 'companies',
                referencedColumnNames: ['id'],
                columnNames: ['company_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('drivers', 'company_id')
        await queryRunner.dropForeignKey('drivers', 'FKCompanyTrucks')
    }

}
