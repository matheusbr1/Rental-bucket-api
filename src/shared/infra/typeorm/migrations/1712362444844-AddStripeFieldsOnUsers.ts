import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddStripeFieldsOnUsers1712362444844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'stripe_customer_id',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'stripe_subscription_id',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'stripe_subscription_status',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'stripe_customer_id')
        await queryRunner.dropColumn('users', 'stripe_subscription_id')
        await queryRunner.dropColumn('users', 'stripe_subscription_status')
    }

}
