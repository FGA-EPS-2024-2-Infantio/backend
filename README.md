

# Guia de Inicialização do Backend

## Clonando o Repositório

Primeiro, clone o repositório para sua máquina local:

```
git clone git@github.com:FGA-EPS-2024-2-Infantio/backend.git
```

## Configuração de Variáveis de Ambiente

Entre nas pastas dos microserviços `users-microservice` e `application-microservice` e crie o arquivo .env em cada uma delas, com base no modelo:

    # Configuração do serviço de usuários 
    cd users-microservice/ 
    cp .env.example .env

    # Configuração do serviço de usuários 
    cd ../application-microservice/
    cp .env.example .env

## Instalação do Node.js
**Nota**: A instalação dos pacotes Node não é obrigatória, pois a execução ocorre via Docker. Contudo, instale-os localmente para evitar possíveis erros de compilação:

Entre na pasta de cada microserviço e instale os pacotes:

    # Serviço de usuários
    cd users-microservice/
    yarn

    # Serviço de aplicação 
    cd ../application-microservice/ 
    yarn

    # API Gateway HTTP 
    cd ../http-api-gateway/ 
    yarn
    
    
## Dependências
Sempre que precisar adicionar um novo pacote, instale-o na sua máquina e, para que as mudanças sejam refletidas, execute o container novamente sem a flag `--build`.

## Executando o Docker

Retorne à pasta raiz do projeto e execute o comando abaixo para construir as imagens necessárias:

    docker-compose up --build

Após a execução desse comando, o backend estará em operação.

## Testando o Serviço de Usuários

Para verificar se o serviço de usuários está funcionando, faça uma chamada `POST` para:

-   **URL**: `http://localhost:3000/users`
    
-   **Body (JSON)**:

`{
	"username": "Lucas Frazão", 
	"email": "lucas@gmail.com", 
	"displayName": "Lucas" 
}`

**Resposta esperada**: Status `201` e um JSON com os dados enviados.

### Para confirmar a criação do usuário no banco de dados:

Acesse o Prisma Studio:

    docker exec -it backend_users_microservice_1 sh yarn prisma studio

No navegador, acesse `http://localhost:5555` para visualizar o Prisma Studio e conferir a criação do usuário na tabela `users`.

## Testando o Serviço de Aplicação

Para verificar se o serviço de aplicação está funcionando, faça uma chamada `POST` para:

-   **URL**: `http://localhost:3000/students`
-   **Body (JSON)**:

 `{ "name": "Lucas Frazão", "monthlyPaymentValue": 100 }`

Para confirmar a criação do estudante no banco de dados:

1.  Acesse o Prisma Studio:

`docker exec -it backend_application_microservice_1 sh yarn prisma studio`

No navegador, acesse `http://localhost:5556` para visualizar o Prisma Studio e conferir a criação do estudante na tabela `student`.
