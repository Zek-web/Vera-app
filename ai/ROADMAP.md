# Feuille de route — IA VERA

## Phase 0 — préparation (faite, 0 €)
- Définir le contrat de réponse.
- Préparer le masquage préliminaire des données.
- Documenter la séparation navigateur / serveur.
- Garder le moteur local actuel indépendant.

## Phase 1 — évaluation hors ligne (0 €)
- Constituer un jeu de messages fictifs : arnaques, messages légitimes, cas ambigus.
- Définir les critères : détection des demandes de données, faux RIB, prise de contrôle à distance, pression/urgence, faux positifs.
- Comparer les résultats du moteur local sans transmettre de données personnelles.
- Ne pas transformer un score en probabilité mathématique.

## Phase 2 — prototype IA
- Choisir un modèle après comparaison de la qualité, de la politique de données et du coût.
- Tester d'abord sur des exemples fictifs et anonymisés.
- Mesurer les faux négatifs et les faux positifs.
- Ne pas activer publiquement tant que les résultats ne sont pas satisfaisants.

## Phase 3 — service sécurisé
- Déployer un backend HTTPS séparé de GitHub Pages.
- Stocker la clé fournisseur dans les secrets d'environnement du backend.
- Ajouter validation d'entrée, limites de taille/fréquence, quotas et suivi des coûts.
- Ne pas journaliser les textes bruts.
- Permettre à VERA de fonctionner si le service est indisponible.

## Phase 4 — lancement progressif
- Consentement explicite avant l'envoi d'un texte à l'IA.
- Afficher ce qui est transmis et ce qui a été masqué.
- Commencer avec un petit groupe de test.
- Garder les alertes locales prioritaires et afficher les incertitudes de l'IA.

**Condition non négociable :** aucun secret API dans le dépôt public ou le code navigateur.
