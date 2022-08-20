## Rental Bucket API (in progress 🚧)

Application built for create, edit and list services, clients, trucks ands drives of some rental bucket company.

I'm bulding the frontend that uses this API too:
<a href='https://github.com/matheusbr1/rental-bucket-api' target='_blank' />Access frontend repo</a>

## Clientes

**RF**
* Deve ser possível cadastrar um cliente
* Deve ser possível deletar um cliente
* Deve ser possível alterar um cliente
* Deve ser possível cadastrar mais de um endereço para um cliente
* Deve ser possível listar todos os clientes

**RN**
* Não deve ser possível cadastrar um cliente com um CPF/CNPJ existente
* Não deve ser possível alterar o CPF/CNPJ do cliente
* Não deve ser possível deletar um cliente com um serviço em aberto
* Não deve ser possível alterar o endereço de um cliente com serviço para aquele endereço em aberto
* Não deve ser possível cadastrar um endereço com o mesmo CEP para o cliente

## Motoristas

**RF**
* Deve ser possível cadastrar um motorista
* Deve ser possível deletar um motorista
* Deve ser possível alterar um motorista
* Deve ser possível listar todos os motoristas

**RN**
* Não deve ser possível cadastrar um motorista com um CPF existente
* Não deve ser possível alterar o CPF do motorista já existente
* Não deve ser possível deletar um motorista com um serviço em aberto

## Caminhões

**RF**
* Deve ser possível cadastrar um caminhão
* Deve ser possível deletar um caminhão
* Deve ser possível alterar um caminhão
* Deve ser possível listar todos os caminhões
* Deve ser possível listar os caminhões por tipo

**RN**
* Não deve ser possível alterar a placa e o renavam de um caminhão
* Não deve ser possível deletar um caminhão com um serviço em aberto
* Não deve ser possível cadastrar um caminhão de um tipo inexistente

## Tipos de Caminhões

**RF**
* Deve ser possível cadastrar um tipo de caminhão
* Deve ser possível listar todos os tipos de caminhão

**RN**
* Não deve ser possível criar um tipo de caminhão com um nome já existente

## Tipos de Equipamentos

**RF**
* Deve ser possível cadastrar um equipamento para o tipo de caminhão
* Deve ser possível listar todos os equipamentos para tipo de caminhão

**RN**
* Não deve ser possível cadastrar um equipamento com o mesmo nome
* Não deve ser possível criar um tipo de equipamento com um id de tipo de caminhão inexistente

## Serviços

**RF**
* Deve ser possível criar um serviço
* Deve ser possível alterar o serviço
* Deve ser possível deletar o serviço
* Deve ser possível listar todos os serviços
* Deve ser possível listar os serviços em aberto
* Deve ser possível listar os serviços finalizados
* Deve ser possível listar os servições por cliente
* Deve ser possível listar os servições por caminhão
* Deve ser possível listar os servições por motorista
* Deve ser possível listar os servições por tipo
* Deve ser possível listar os servições por período

 **RN**
* Não deve ser possível alterar o cliente do serviço
* O serviço deve ter duração mínima de 24 horas

## Tipos de Serviços

**RF**
* Deve ser possível cadastrar um tipo de serviço
* Deve ser possível listar todos os tipos de serviço
