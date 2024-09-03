# C'est quoi ce projet ?

C'est un petit projet de serveur API avec Nest.js .
D'après le tuto de Virgile RIETSCH sur YouTube.

Le but est de comprendre et d'obtenir un MVP contenant les fonctionnalités d'inscription et de connexion. Pour pouvoir le ré-utiliser pour d'autres projets.

# Commandes utilisées

## Mise en place
nest new nestjs-chat

npm run dev

## User

nest generate module user
nest generate controller user --no-spec
nest generate service user --no-spec

## Prisma (ORM)
npm install prisma --save-dev
npx prisma init

planetscale.com (pour SGBD)
J'essaie plutôt d'utiliser XAMPP et MySQL :
DATABASE_URL="mysql://root:@localhost:3306/nestjs-chat"

npx prisma db push

## Authentification

nest generate module auth
nest generate controller auth --no-spec
nest generate service auth --no-spec

npm i bcrypt
npm i --save @types/bcrypt

npm install --save @nestjs/jwt

> Génération du "secret"
> Google : generate random hash 256

npm i --save @nestjs/config

npm install --save @nestjs/passport passport
npm i passport-jwt
npm i @types/passport-jwt