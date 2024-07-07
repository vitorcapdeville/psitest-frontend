# Use a imagem oficial do Node.js
FROM node:18-alpine

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo de pacotes para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do aplicativo para o contêiner
COPY . .

RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]