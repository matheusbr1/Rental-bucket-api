import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHasSubscriptionFlagOnCompanies1714690365397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'companies',
            new TableColumn({
                name: 'hasSubscription',
                type: 'boolean',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('companies', 'hasSubscription')
    }

}
