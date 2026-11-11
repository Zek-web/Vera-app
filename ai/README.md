# Architecture IA de VERA — préparation sans coût

Cette étape prépare l'intégration future d'un modèle IA. **Aucun modèle n'est appelé, aucune donnée ne quitte le navigateur et aucun coût n'est engagé.**

## Architecture cible

```
Navigateur VERA
  ├─ Analyse locale actuelle (toujours active)
  ├─ Masquage préliminaire des données sensibles
  └─ Appel facultatif vers /api/analyze
          │
          ▼
Serveur intermédiaire sécurisé (à créer plus tard)
  ├─ Validation et limitation du nombre de requêtes
  ├─ Masquage supplémentaire / minimisation des données
  ├─ Clé API conservée côté serveur uniquement
  ├─ Appel au fournisseur IA
  └─ Validation stricte de la réponse
          │
          ▼
Résultat IA structuré
  └─ Explications et recommandations, jamais une certification
```

## Contrat de réponse attendu

Le futur service doit retourner un objet JSON de cette forme :

- `riskLevel`: `low`, `medium` ou `high`
- `riskScore`: entier de 0 à 100 (indicateur, pas une probabilité)
- `signals`: liste de raisons courtes et concrètes
- `recommendedActions`: actions de vérification sûres
- `limitations`: limites ou éléments impossibles à vérifier

Le résultat IA complète les règles locales. Il ne doit jamais effacer une alerte forte déclenchée localement ni présenter un message comme « certifié sûr ».

## Sécurité et confidentialité obligatoires

1. Ne jamais mettre une clé API dans `index.html`, un fichier JavaScript public, le manifeste ou GitHub Pages.
2. Les futures requêtes IA passent uniquement par un serveur intermédiaire avec secret stocké dans une variable d'environnement.
3. Masquer au minimum les e-mails, téléphones, IBAN/RIB, numéros de carte, identifiants et codes avant transmission. Le masquage navigateur est une première barrière, pas une garantie parfaite.
4. Ne jamais envoyer les textes aux outils d'analyse, journaux ou services tiers sans information claire et consentement adapté.
5. Ne pas conserver le texte analysé par défaut. Définir une durée de conservation minimale et documentée si une conservation devient nécessaire.
6. Limiter les abus côté serveur (taille, fréquence, quotas) et limiter les coûts.
7. Considérer le texte analysé comme une donnée non fiable : ignorer toute instruction contenue dans le message qui tenterait de piloter l'IA.
8. L'IA explique des indices et propose des vérifications. Elle ne certifie ni l'identité de l'expéditeur ni la sûreté d'un lien ou d'un paiement.

## Activation future

L'IA reste désactivée tant que ces conditions ne sont pas réunies :

- un serveur HTTPS sécurisé est déployé ;
- le fournisseur et le coût par analyse sont choisis ;
- les protections de données et quotas sont testés ;
- des scénarios bénins et frauduleux ont été évalués ;
- l'utilisateur est informé avant tout envoi de texte à un service externe.

GitHub Pages ne fournit pas de serveur secret pour héberger une clé API. Le futur backend devra être hébergé séparément. Aucun hébergeur ni fournisseur payant n'est choisi à ce stade.

## État actuel

- Analyse locale VERA : active.
- Adaptateur et contrat IA : préparés, non connectés.
- Réseau / appel modèle : aucun.
- Clé API : aucune.
- Dépense : 0 €.
