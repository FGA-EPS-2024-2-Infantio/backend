## Dependências
Para adicionar um novo pacote ao projeto, instale-o na sua máquina local. Após a instalação, reinicie o container para que as novas dependências sejam refletidas no ambiente Docker. Observação: não utilize a flag `--build` ao reiniciar o container, pois não é necessário reconstruir a imagem.

## Migrations

O projeto utiliza o Prisma como ORM, e toda vez que houver uma alteração no schema.prisma, você precisará atualizar as migrations tanto na sua máquina local quanto no ambiente Docker. 

Aqui está o processo detalhado:

Na seu terminal:

1. `yarn prisma migrate dev --name "<Nome da migration>"` 

Isso aplicará a migration localmente, criando ou atualizando as tabelas no banco de dados conforme as alterações do schema.

2. `yarn docker:migrate` 

Este comando aplicará a migration dentro do container Docker.

### Reset

Para resetar o banco de dados e as migrations localmente, utilize:

1. `yarn prisma migrate reset`
2. `yarn docker:reset`

## Acessando o Prisma Studio

Para visualizar o banco de dados rapidamente e explorar os dados, utilize o Prisma Studio. Para acessá-lo dentro do container Docker e abri-lo no seu navegador local:

`yarn docker:studio` 

Este comando irá abrir o Prisma Studio na porta definida, acessível também via localhost no seu navegador.