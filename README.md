# C'est quoi ce projet ?

C'est un petit projet de serveur API avec Nest.js .
D'après le tuto de Virgile RIETSCH sur YouTube.

Le but est de comprendre et d'obtenir un MVP contenant les fonctionnalités d'inscription et de connexion. Pour pouvoir le ré-utiliser pour d'autres projets.

# Commandes utilisées
nest new nestjs-chat

npm run dev

nest generate module user
nest generate controller user
nest generate service user --no-spec

## Prisma (ORM)
npm install prisma --save-dev
npx prisma init

planetscale.com (pour SGBD)
J'essaie plutôt d'utiliser XAMPP et MySQL :
DATABASE_URL="mysql://root:@localhost:3306/nestjs-chat"

npx prisma db push





