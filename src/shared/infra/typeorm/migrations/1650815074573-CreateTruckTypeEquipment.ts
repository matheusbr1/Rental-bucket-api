import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTruckTypeEquipment1650815074573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'truck_type_equipments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'capacity',
                        type: 'varchar'
                    },
                    {
                        name: 'truck_type_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKTruckTypesEquipment', // Nome da chave estrangeira
                        referencedTableName: 'truck_types', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['truck_type_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('truck_type_equipments')
    }

}
