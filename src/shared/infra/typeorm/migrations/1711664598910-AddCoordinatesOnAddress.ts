import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCoordinatesOnAddress1711664598910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "adresses",
            new TableColumn({
                name: 'lat',
                type: 'numeric',
                isNullable: true
            })
        )
        await queryRunner.addColumn(
            "adresses",
            new TableColumn({
                name: 'lng',
                type: 'numeric',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('adresses', 'lat')
        await queryRunner.dropColumn('adresses', 'lng')
    }

}
