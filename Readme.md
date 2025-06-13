# n8n-nodes-linkedin-jobs

![LinkedIn Jobs Node](https://img.shields.io/badge/n8n-LinkedIn%20Jobs-blue)
![Version](https://img.shields.io/npm/v/n8n-nodes-linkedin-jobs)
![License](https://img.shields.io/npm/l/n8n-nodes-linkedin-jobs)

Nœud n8n personnalisé pour récupérer des offres d'emploi LinkedIn avec des filtres avancés. Basé sur l'API [linkedin-jobs-api](https://github.com/VishwaGauravIn/linkedin-jobs-api).

## 🚀 Fonctionnalités

- ⚡ **Recherche ultra-rapide** d'offres d'emploi LinkedIn
- 🔍 **Filtres avancés** : localisation, type d'emploi, télétravail, salaire, expérience
- 📊 **Données structurées** avec toutes les informations pertinentes
- 🎯 **Ciblage précis** avec mots-clés et critères multiples
- 🔄 **Pagination** pour récupérer un grand nombre d'offres
- 🏷️ **Tri personnalisé** par pertinence ou date

## 📋 Pré-requis

- n8n version 1.0.0 ou supérieure
- Node.js 18.10 ou supérieur
- Package `linkedin-jobs-api` installé

## 🔧 Installation

### Installation via l'interface n8n

1. Ouvrez votre instance n8n
2. Allez dans **Paramètres** > **Community Nodes**
3. Cliquez sur **Installer un package de nœuds**
4. Entrez `n8n-nodes-linkedin-jobs`
5. Cliquez sur **Installer**

### Installation manuelle

```bash
# Dans votre répertoire n8n
npm install n8n-nodes-linkedin-jobs

# Ou avec npm
npm add n8n-nodes-linkedin-jobs
```

### Installation pour le développement

```bash
# Cloner le repository
git clone https://github.com/votre-username/n8n-nodes-linkedin-jobs.git
cd n8n-nodes-linkedin-jobs

# Installer les dépendances
npm install

# Construire le projet
npm build

# Lier le package pour le développement local
npm link
```

## 🎯 Utilisation

### Recherche basique

1. Ajoutez le nœud **LinkedIn Jobs** à votre workflow
2. Configurez les paramètres de recherche :
   - **Mot-clé** : "développeur frontend"
   - **Localisation** : "Paris, France"
   - **Nombre de résultats** : 10

### Exemple de workflow

```json
{
  "nodes": [
    {
      "name": "Recherche Jobs LinkedIn",
      "type": "n8n-nodes-linkedin-jobs.linkedInJobs",
      "parameters": {
        "keyword": "développeur python",
        "location": "Lyon, France",
        "jobType": "full time",
        "remoteFilter": "remote",
        "experienceLevel": "senior",
        "limit": 20,
        "sortBy": "recent"
      }
    }
  ]
}
```

## 📊 Paramètres disponibles

| Paramètre | Type | Description | Valeurs possibles |
|-----------|------|-------------|-------------------|
| **keyword** | string | Mots-clés de recherche | ex: "développeur frontend", "data scientist" |
| **location** | string | Localisation géographique | ex: "Paris, France", "Remote" |
| **dateSincePosted** | select | Période de publication | `24hr`, `past week`, `past month` |
| **jobType** | select | Type d'emploi | `full time`, `part time`, `contract`, `temporary`, `volunteer`, `internship` |
| **remoteFilter** | select | Mode de travail | `on site`, `remote`, `hybrid` |
| **salary** | select | Salaire minimum | `40000`, `60000`, `80000`, `100000`, `120000` |
| **experienceLevel** | select | Niveau d'expérience | `internship`, `entry level`, `associate`, `senior`, `director`, `executive` |
| **limit** | number | Nombre de résultats | 1 à 100 |
| **sortBy** | select | Tri des résultats | `recent`, `relevant` |
| **page** | number | Numéro de page | 0, 1, 2... |

## 📄 Format des données de sortie

Chaque offre d'emploi retourne les données suivantes :

```json
{
  "position": "Développeur Frontend Senior",
  "company": "TechCorp",
  "companyLogo": "https://static.licdn.com/...",
  "location": "Paris, France",
  "date": "2024-01-15",
  "agoTime": "3 jours",
  "salary": "60 000 - 80 000 €",
  "jobUrl": "https://linkedin.com/jobs/view/...",
  "searchParams": {
    "keyword": "développeur frontend",
    "location": "Paris, France"
  },
  "retrievedAt": "2024-01-18T10:30:00.000Z"
}
```

## 🔄 Exemples de workflows

### 1. Veille emploi automatique

```
Scheduler (quotidien) 
→ LinkedIn Jobs (recherche) 
→ Filter (nouveaux jobs uniquement) 
→ Slack (notification)
```

### 2. Analyse de marché

```
Manual Trigger 
→ LinkedIn Jobs (multiple recherches) 
→ Merge (consolidation) 
→ Google Sheets (sauvegarde)
```

### 3. Alertes personnalisées

```
Webhook (déclencheur externe) 
→ LinkedIn Jobs (recherche ciblée) 
→ IF (critères spécifiques) 
→ Email (alerte)
```

## 🚨 Bonnes pratiques

### Gestion des erreurs
- Utilisez toujours un nœud **Error Trigger** pour capturer les erreurs
- Implémentez une logique de retry avec des délais progressifs
- Loggez les erreurs pour faciliter le débogage

### Performance
- Limitez le nombre de résultats par requête (max 100)
- Utilisez la pagination pour traiter de gros volumes
- Ajoutez des délais entre les requêtes pour éviter le rate limiting

### Respect des limites
- Ne pas faire plus de 10 requêtes par minute
- Utiliser le cache pour éviter les requêtes redondantes
- Respecter les conditions d'utilisation de LinkedIn

## 🔧 Dépannage

### Erreur "Package non installé"
```bash
# Dans votre environnement n8n
npm install linkedin-jobs-api
```

### Pas de résultats
- Vérifiez l'orthographe des mots-clés
- Élargissez les critères de recherche
- Testez sans filtres pour valider la requête

### Erreurs de connexion
- Vérifiez votre connexion internet
- Testez avec des requêtes simples
- Contactez le support si le problème persiste

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [VishwaGauravIn](https://github.com/VishwaGauravIn) pour l'API linkedin-jobs-api
- L'équipe n8n pour la plateforme et la documentation
- La communauté n8n pour le support et les retours

## 📞 Support

- 🐛 [Signaler un bug](https://github.com/votre-username/n8n-nodes-linkedin-jobs/issues)
- 💡 [Proposer une fonctionnalité](https://github.com/votre-username/n8n-nodes-linkedin-jobs/issues)
- 💬 [Discussions](https://github.com/votre-username/n8n-nodes-linkedin-jobs/discussions)
- 📧 Email : contact@franckbouda.com

---

⭐ **N'oubliez pas de donner une étoile au projet si il vous est utile !**