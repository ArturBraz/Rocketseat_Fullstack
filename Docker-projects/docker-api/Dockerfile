FROM node:18-alpine3.20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos do projeto para dentro do contêiner
COPY . .

# Instala as dependências do projeto
RUN npm install

# Roda a build do projeto
RUN npm run build

# expoe a porta da aplicação para que seja acessivel no container
EXPOSE 3333

# Executa o comando de "start"
CMD [ "npm", "start"]