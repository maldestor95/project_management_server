#Project Name: Project manager


#Objectif

Créer une application multi-user de gestion de projets.
-mise en oeuvre de NodeJS, Express et MongoDB


#Outils de développement
Editeur Sublime3 avec plugins:
* AngularJS
* Color Picker
* HTML5
* Package Control



#Développement
##Pré-requis:
* Nécessite d'utiliser google chrome avec plugin Batarang pour pouvoir débugger AngularJS
* La distribution doit être lancée à partir d'un serveur local
* fichier ./src/process.env doit contenir les variables d'environnements:
	* `NODE_ENV=development`  ou autre valeur si le serveur express est dans un autre état
	* `MONGLAB_URI=localhost:27017/projet`  chemin vers la base de donnée locale MONGODB.



#Mise en production sur HEROKU
##vérifier les variables d'environnement:
* lecture des variables `heroku config` 
* configuration des variables `heroku config:set NODE_ENV=production`

##Mise à jour du site:
Cela se fait toujours à partir de la branche master.
`git push heroku master`





##Outil de construction
###GRUNT
  mise en place de Grunt comme outil de construction des fichiers CSS à partir de structure .LESS
  * lancer dans un shell : "grunt auto_css"

#Bugs et évolutions

#Documentation

