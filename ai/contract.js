/*
 * Contrat client/serveur de VERA.
 * Aucun appel réseau, aucune clé API et aucun modèle ne sont utilisés ici.
 * À utiliser comme préparation uniquement ; l'appel fournisseur devra vivre côté serveur.
 */
(function (root) {
  'use strict';

  const VERSION = '1.0';

  // Masquage préliminaire au mieux. Ce n'est pas une garantie exhaustive :
  // les utilisateurs doivent toujours retirer les informations qu'ils ne souhaitent pas partager.
  function redactSensitiveData(input) {
    let text = String(input || '').slice(0, 10000);

    text = text
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[E-MAIL MASQUÉ]')
      .replace(/\b(?:FR)?\d{2}(?:[ .-]?\d{4}){4,7}\b/gi, '[COORDONNÉE BANCAIRE MASQUÉE]')
      .replace(/\b(?:\d[ -]*?){13,19}\b/g, '[NUMÉRO POTENTIELLEMENT SENSIBLE MASQUÉ]')
      .replace(/\b(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}\b/g, '[TÉLÉPHONE MASQUÉ]')
      .replace(/\b\d{4,8}\b/g, '[CODE POTENTIELLEMENT SENSIBLE MASQUÉ]');

    return text;
  }

  function createAnalysisRequest(input, kind) {
    return {
      contractVersion: VERSION,
      kind: ['message', 'link', 'payment'].includes(kind) ? kind : 'message',
      text: redactSensitiveData(input),
      requestedOutput: {
        riskLevel: ['low', 'medium', 'high'],
        riskScore: 'integer 0..100; indicator only, not a probability',
        signals: 'array of concise explanations',
        recommendedActions: 'array of safe verification steps',
        limitations: 'array of uncertainty statements'
      }
    };
  }

  function validateAnalysisResponse(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const levels = ['low', 'medium', 'high'];
    if (!levels.includes(value.riskLevel)) return null;
    if (!Number.isInteger(value.riskScore) || value.riskScore < 0 || value.riskScore > 100) return null;

    const cleanList = (items) => Array.isArray(items)
      ? items.filter(item => typeof item === 'string').slice(0, 8).map(item => item.slice(0, 400))
      : [];

    return {
      riskLevel: value.riskLevel,
      riskScore: value.riskScore,
      signals: cleanList(value.signals),
      recommendedActions: cleanList(value.recommendedActions),
      limitations: cleanList(value.limitations)
    };
  }

  const api = Object.freeze({ redactSensitiveData, createAnalysisRequest, validateAnalysisResponse });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.VeraAIContract = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
