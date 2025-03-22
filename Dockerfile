# Etapa de build com Node.js
FROM node:18 as build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto
COPY . .

# Execute o build do Nuxt (certifique-se de que o Nuxt está configurado para gerar o build corretamente)
RUN npm run build

# Etapa de produção com Nginx
FROM nginx:alpine

# Copie os arquivos gerados pelo build para o diretório do Nginx
COPY --from=build /app/.output/public /usr/share/nginx/html

# Exponha a porta 8080 para o Nginx
EXPOSE 8080

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]


# FROM node:18 as build

# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
