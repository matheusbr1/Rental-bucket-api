import { TableColumn, MigrationInterface, QueryRunner } from "typeorm";
import { WorkStatus } from "../../../../modules/works/infra/typeorm/entities/Work";

export class AddStatusOnWorks1719597822449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'works',
            new TableColumn({
                name: 'status',
                type: 'enum',
                enum: Object.values(WorkStatus),
                default: `'${WorkStatus.PENDING}'`
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('works', 'status')
    }

}
