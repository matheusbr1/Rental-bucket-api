# O dockerfile define como o nosso container vai rodar
# É um passo a passo pro docker

# Imagem que vai rodar no container
FROM node

# Diretório de trabalho do container
WORKDIR /usr/app

# Copiando o arquivo para o diretório acima
COPY package.json ./

# Baixando as dependências
RUN npm install

# Copiando tudo para a pasta raiz
COPY . .

# Expondo uma porta para o app
EXPOSE 3334

# Rodando o script para iniciar o app
CMD ["npm", "run", "dev"]

# Para criar a imagem com as instruções acima:
# docker build -t APPNAMEHERE . 
# Para rodar após a criação
# docker run -p 3334:3334 APPNAMEHERE