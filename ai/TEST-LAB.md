# Banc d’essai hors ligne VERA

## Objectif
Évaluer les réactions de la version actuelle de VERA sur 50 exemples fictifs, sans réseau, sans modèle d’IA et sans données personnelles réelles.

## Fichiers
- `test-cases.json` : 50 messages de test et le résultat de vigilance attendu.
- L’application à tester : https://zek-web.github.io/Vera-app/

## Méthode
1. Ouvrir l’application VERA.
2. Copier chaque message du fichier JSON dans VERA.
3. Cliquer sur « Analyser les signaux ».
4. Comparer le niveau affiché (`low`, `medium`, `high`) avec `expectedLevel`.
5. Noter les écarts dans un tableau de suivi : identifiant, niveau attendu, niveau obtenu, signaux présents, commentaire.
6. Refaire les cas ambigus après les cas manifestement frauduleux.

## Mesures à relever
- **Faux négatifs prioritaires** : cas attendus `high` classés `low` ou `medium`.
- **Faux positifs** : cas attendus `low` classés `high`.
- **Cas à revoir** : toute différence entre niveau attendu et obtenu.
- **Signaux manquants** : le niveau est correct mais l’explication attendue n’apparaît pas.

## Règles d’interprétation
- Le score de VERA est un indicateur heuristique, pas une probabilité de fraude.
- Un score faible ne prouve jamais qu’un message est authentique.
- Les cas `ambigue` servent à repérer les situations où le contexte manque.
- Les tests ne doivent jamais utiliser de vrais RIB, IBAN, cartes, mots de passe, codes ou documents.
- Ne pas baisser une alerte sur les demandes de codes de sécurité, mots de passe, données de carte ou coordonnées bancaires au seul motif que le message paraît professionnel.

## Limite actuelle
Ce banc d’essai est préparé, mais il n’exécute pas automatiquement le moteur privé inclus dans `index.html`. Les résultats doivent être relevés dans l’application. Une automatisation des tests pourra être ajoutée ensuite sans modifier le comportement utilisateur.

## Résultat attendu
À la fin des 50 essais, dresser la liste des faux négatifs, faux positifs et règles à améliorer avant toute connexion d’une IA.
