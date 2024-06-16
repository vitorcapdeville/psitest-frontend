# Use a imagem oficial do Node.js
FROM node:18-alpine

# Defina a variável de ambiente para que a saída Node.js seja enviada diretamente
# para o terminal sem ser primeiro armazenada em buffer.
ENV NODE_ENV=development
ENV GATEWAY_URL=http://gateway:80
ENV PASSWORD_MIN_LENGTH=1
# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo de pacotes para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do aplicativo para o contêiner
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]