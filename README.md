# Installation de BudJet

## __1. prérequis__

docker

## __2. lancement__

- cloner le projet
- dans le dossier `projetfullstack`, exécuter la commande : `docker compose up --build -d`

Vous pouvez désormais accéder à l'interface de test des endpoints de l'API à [cette adresse](http://localhost:5000/api/docs), et à l'application web en elle même [ici](http://localhost:3000).

## __3. arrêt__

Pour stopper le projet, exécuter la commande : `docker compose down` dans un terminal, ou `docker compose down -v`si vous ne souhaitez pas conserver les données présentes dans la base de données.
