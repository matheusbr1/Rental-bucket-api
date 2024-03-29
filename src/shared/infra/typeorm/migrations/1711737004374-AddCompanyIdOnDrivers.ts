import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCompanyIdOnDrivers1711737004374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "drivers",
            new TableColumn({
                name: 'company_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'drivers',
            new TableForeignKey({
                name: 'FKCompanyDrivers',
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
        await queryRunner.dropForeignKey('drivers', 'FKCompanyDrivers')
    }

}
