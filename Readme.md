# Projet JavaScript : Jeu Pong


## Auteurs

**Isabelle Bivegue Ngoa & Johanna Pululu Ngambani**

## Environnement de travail

### Installation

Pour récupérer les sources du projet, faire dans un répetoire vide :

```sh
git clone git@gitlab-etu.fil.univ-lille1.fr:biveguengoa/jsfs_l3_bivegue_pululu.git

```

Une fois le projet cloné, placez vous dans le répertoire _src_ du dossier client (_../client/src>_) et exécutez les commandes suivantes :

```sh
% npm install
% npm install socket.io-client
% npm run build

```

Ensuite, placez vous dans le dossier server (vous devez être dans _../../server>_) et exécutez les commandes suivantes :

```sh
% npm install
% npm run start

```

La dernière commande permet de démarrer le serveur (celui-ci démarrera à l'adresse `http://localhost:8085/public/index.html`). Tout est prêt pour commencer le jeu !


**NB** : Ci-dessous quelques informations utiles concernant le jeu 

- Pour pouvoir commencer le jeu, il faut **obligatoirement** que deux clients soient connectés et rejoignent le jeu ;
- Pour chaque client, sa raquette est toujours celle de gauche (et la raquette de droite celle de son adversaire).



## 1. Présentation globale du projet 

L'objectif est de réaliser une version simplifiée de l'historique jeu Pong.
Le concept original de Pong est une simulation simpliste de tennis de table ou ping-pong, repris pour le nom du jeu. Une balle, se déplace à travers l'écran et rebondit sur les rebords du haut et du bas. Les deux joueurs commandent chacun une raquette, représentée par un bloc vertical aux extrémités gauche et droite du terrain de jeu.Les bords de l'écran matérialisent les limites du terrain, la balle ne pouvant pas sortir par le haut ou le bas.
Enfin, les scores de chaque joueur sont affichés en haut de leur zone respective. Le but du jeu étant d’envoyer la balle dans le camp adverse en mettant son adversaire dans l’incapacité de la renvoyer, pour ainsi marquer 1 point.



## 2. Fonctionnalités du Cahier des charges.

### 2.1 Déplacements de la balle

La balle occupe un point et un seul de la grille et se déplace en passant d'une position à l'autre.
Ce point est à garder en mémoire lorsque l'on désirera faire varier la vitesse de la balle et tester les collisions avec les raquettes. En effet, elle ne devra pas aller trop vite sous peine de donner l'impression de sauter d'un bout de l'écran à l'autre.


La balle rebondit sur les bords haut et bas de la zone de jeu, mais ne rebondit pas sur les bords gauche et droit. Elle ne rebondira que si une raquette s'interpose.

### 2.2 Mise en jeu de la balle

La balle est mise en jeu au milieu de l'écran avec une vitesse initiale établie.


### 2.3 Rebonds sur les bords haut et bas

Les rebonds sur les bords haut et bas doivent se faire suivant un angle droit par rapport à son incidence d'arrivée.

### 2.4 Rebonds sur les raquettes

Le rebond de la balle sur les raquettes sera soumis à la même règle que celle présentée ci-dessus.
Cependant, si la mise en jeu de la balle donne un déplacement horizontal, alors cette dernière va se contenter de rebondir d'une raquette à l'autre et l'intérêt du jeu sera limité. 

### 2.5 Déplacement des raquettes

Chaque raquette a une hauteur d'environs 2 cm et peut être déplacée à l'aide du clavier :

* touches _up_ et _down_ pour la raquette de gauche.
* touches _left_ et _right_ pour la raquette de droite.

Bien entendu, ce ne sont que des propositions de touches.

### 2.6 Décompte des scores

Les scores sont en permanence affiché à l'écran. A chaque marquage des points d'un des joueurs, les scores sont actualisés.

## 3. Difficultés rencontrées 

- Nous avons rencontré quelques difficultés au niveau de :

* La gestion du réseau.
* La gestion de synchronisation entre les clients faisant partie d'une même _PrivateRoom_(salle privée).
* Synchronisation de la base au niveau du client



## 4. Compétences acquises.

Tout au long de la réalisation de ce projet nous avions été capable de/d' :

* Maîtriser les fonctionnalités de la plateforme Node.js afin de professionnaliser notre programmation en JavaScript.
* Exploiter la bibliothèque Socket.io.
* Programmer en JavaScript dans un environnement serveur/client.
* Exploiter les fonctionnalités offertes par Webpack.

