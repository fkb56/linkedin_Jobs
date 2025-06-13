"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInJobs = void 0;
// Import des valeurs à l'exécution pour compatibilité n8n Community Nodes
const { NodeOperationError, } = require('n8n-workflow');
class LinkedInJobs {
    constructor() {
        this.description = {
            displayName: 'LinkedIn Jobs',
            name: 'linkedInJobs',
            icon: 'file:linkedin.svg',
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Récupère des offres d\'emploi depuis LinkedIn avec des filtres avancés',
            defaults: {
                name: 'LinkedIn Jobs',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Job',
                            value: 'job',
                        },
                    ],
                    default: 'job',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Search',
                            value: 'search',
                            description: 'Rechercher des offres d\'emploi',
                            action: 'Rechercher des offres d\'emploi',
                        },
                    ],
                    default: 'search',
                },
                // Paramètres de recherche
                {
                    displayName: 'Mot-clé',
                    name: 'keyword',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    default: '',
                    placeholder: 'ex: développeur frontend',
                    description: 'Le texte à rechercher (ex: développeur logiciel)',
                },
                {
                    displayName: 'Localisation',
                    name: 'location',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    default: '',
                    placeholder: 'ex: Paris, France',
                    description: 'Nom de la ville ou région',
                },
                {
                    displayName: 'Date de publication',
                    name: 'dateSincePosted',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Tout',
                            value: '',
                        },
                        {
                            name: 'Dernières 24h',
                            value: '24hr',
                        },
                        {
                            name: 'Dernière semaine',
                            value: 'past week',
                        },
                        {
                            name: 'Dernier mois',
                            value: 'past month',
                        },
                    ],
                    default: '',
                    description: 'Période de publication des offres',
                },
                {
                    displayName: 'Type d\'emploi',
                    name: 'jobType',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Tous',
                            value: '',
                        },
                        {
                            name: 'Temps plein',
                            value: 'full time',
                        },
                        {
                            name: 'Temps partiel',
                            value: 'part time',
                        },
                        {
                            name: 'Contrat',
                            value: 'contract',
                        },
                        {
                            name: 'Temporaire',
                            value: 'temporary',
                        },
                        {
                            name: 'Bénévolat',
                            value: 'volunteer',
                        },
                        {
                            name: 'Stage',
                            value: 'internship',
                        },
                    ],
                    default: '',
                    description: 'Type de poste recherché',
                },
                {
                    displayName: 'Télétravail',
                    name: 'remoteFilter',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Tous',
                            value: '',
                        },
                        {
                            name: 'Sur site',
                            value: 'on site',
                        },
                        {
                            name: 'Télétravail',
                            value: 'remote',
                        },
                        {
                            name: 'Hybride',
                            value: 'hybrid',
                        },
                    ],
                    default: '',
                    description: 'Préférence de télétravail',
                },
                {
                    displayName: 'Salaire minimum',
                    name: 'salary',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Aucun minimum',
                            value: '',
                        },
                        {
                            name: '40 000+',
                            value: '40000',
                        },
                        {
                            name: '60 000+',
                            value: '60000',
                        },
                        {
                            name: '80 000+',
                            value: '80000',
                        },
                        {
                            name: '100 000+',
                            value: '100000',
                        },
                        {
                            name: '120 000+',
                            value: '120000',
                        },
                    ],
                    default: '',
                    description: 'Salaire minimum recherché',
                },
                {
                    displayName: 'Niveau d\'expérience',
                    name: 'experienceLevel',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Tous',
                            value: '',
                        },
                        {
                            name: 'Stage',
                            value: 'internship',
                        },
                        {
                            name: 'Débutant',
                            value: 'entry level',
                        },
                        {
                            name: 'Confirmé',
                            value: 'associate',
                        },
                        {
                            name: 'Senior',
                            value: 'senior',
                        },
                        {
                            name: 'Directeur',
                            value: 'director',
                        },
                        {
                            name: 'Exécutif',
                            value: 'executive',
                        },
                    ],
                    default: '',
                    description: 'Niveau d\'expérience requis',
                },
                {
                    displayName: 'Nombre de résultats',
                    name: 'limit',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    default: 10,
                    typeOptions: {
                        minValue: 1,
                        maxValue: 100,
                    },
                    description: 'Nombre d\'offres à retourner (1-100)',
                },
                {
                    displayName: 'Trier par',
                    name: 'sortBy',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    options: [
                        {
                            name: 'Par défaut',
                            value: '',
                        },
                        {
                            name: 'Plus récent',
                            value: 'recent',
                        },
                        {
                            name: 'Plus pertinent',
                            value: 'relevant',
                        },
                    ],
                    default: '',
                    description: 'Ordre de tri des résultats',
                },
                {
                    displayName: 'Page',
                    name: 'page',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['search'],
                            resource: ['job'],
                        },
                    },
                    default: 0,
                    typeOptions: {
                        minValue: 0,
                    },
                    description: 'Numéro de page (commence à 0)',
                },
            ],
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        // Import dynamique du package linkedin-jobs-api
        let linkedIn;
        try {
            linkedIn = require('linkedin-jobs-api');
        }
        catch (error) {
            throw new NodeOperationError(this.getNode(), 'Le package "linkedin-jobs-api" n\'est pas installé. Installez-le avec: npm install linkedin-jobs-api');
        }
        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'job' && operation === 'search') {
                    // Récupération des paramètres
                    const pageParam = this.getNodeParameter('page', i);
                    const pageValue = pageParam != null ? pageParam.toString() : '0';
                    const queryOptions = {
                        keyword: this.getNodeParameter('keyword', i),
                        location: this.getNodeParameter('location', i),
                        dateSincePosted: this.getNodeParameter('dateSincePosted', i),
                        jobType: this.getNodeParameter('jobType', i),
                        remoteFilter: this.getNodeParameter('remoteFilter', i),
                        salary: this.getNodeParameter('salary', i),
                        experienceLevel: this.getNodeParameter('experienceLevel', i),
                        limit: String(this.getNodeParameter('limit', i)),
                        sortBy: this.getNodeParameter('sortBy', i),
                        page: pageValue,
                    };
                    // Nettoyage des paramètres vides
                    Object.keys(queryOptions).forEach(key => {
                        if (queryOptions[key] === '' || queryOptions[key] === undefined) {
                            delete queryOptions[key];
                        }
                    });
                    // Exécution de la requête
                    const response = await linkedIn.query(queryOptions);
                    if (Array.isArray(response)) {
                        // Ajouter chaque offre d'emploi comme un élément séparé
                        for (const job of response) {
                            returnData.push({
                                json: {
                                    ...job,
                                    // Ajout de métadonnées de recherche
                                    searchParams: queryOptions,
                                    retrievedAt: new Date().toISOString(),
                                },
                            });
                        }
                    }
                    else {
                        // Si la réponse n'est pas un tableau, l'ajouter tel quel
                        returnData.push({
                            json: {
                                data: response,
                                searchParams: queryOptions,
                                retrievedAt: new Date().toISOString(),
                            },
                        });
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : String(error),
                            searchParams: this.getNodeParameter('keyword', i),
                        },
                    });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.LinkedInJobs = LinkedInJobs;
