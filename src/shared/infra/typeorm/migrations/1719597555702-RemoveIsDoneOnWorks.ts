import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveIsDoneOnWorks1719597555702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('works', 'is_done')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'works',
            new TableColumn({
                name: 'is_done',
                type: 'boolean',
                default: 'false',
            })
        )
    }

}
