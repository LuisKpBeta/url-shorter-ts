# Link shortener

Este projeto trata-se de um encurtador de URL's escrito utilizando NodeJs com banco de dados em Postgres


## Tecnologias

Para a construção da aplicação foi utlizado Typescript para melhor organização de tipagem, junto a isso foi utilizado Prisma para trabalhar com o banco de dados SQL, para facilitar a execução da aplicação, foi criado o arquivo `docker-compose.yml` para configuração dos containers e variáveis de ambiente utilizadas
Para a elaboração dos testes foi utlizando a biblioteca Jest e supertest

## Scripts
- `npm test`: executa os testes da aplicação
- `npm start`: inicializa a aplicação em modo de produção
- `npm dev`: executa a aplicação em modo de desenvolvimento
- `npm build`: realiza o build do typescript para javascript
- `npm docker:up`: realiza o build da aplicação para ser executada utilizando docker-compose
- `npm docker:down`: para todas as instâncias de containers listados no docker-compose
- `npm migrate`: executa as migrations para modo de desenvolvedor
- `npm migrate:deploy`: executa migrations pendentes, utilizado no deploy com docker

### Variáveis de ambiente:
- `SERVER_NAME`: definição da url para acesso ao servidor, é utlizada para disponibilizar o link encurtado para o cliente
- `DATABASE_URL`: utilizada pelo ORM Prisma para acessar o banco de dados