const _ = require('lodash');
const sortObj = require('sort-object');

module.exports = function(app) {
    const cssFiles = [{
        file: 'italia-it.min.css'
    }, {
        file: 'italia-it-vendor.min.css'
    }, {
        file: 'spid-common.min.css'
    }];

    const jsFiles = [{
        file: 'italia-it.min.js'
    }, {
        file: 'spid-common.min.js'
    }];

    app.get("/", function(request, response) {
        response.render("pages/home", {
            pageTitle: 'Home',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }            
        });
    });

    app.get("/check", function(request, response) {
        response.redirect("/");
    });

    app.get("/spidweek", function(request, response) {
      response.redirect("/spid-week");
    });

    app.get("/spid-week", function(request, response) {
      const twitter = require('./twitter');
      response.render("pages/spid-week", {
          twits: twitter.twits('AgidGov', '#spidweek', 3),
          pageTitle: 'SPID Week',
          cssFiles,
          jsFiles,
          helpers: {
            _: function(text) { 
                let translated = text;
                try {
                    translated = request.Globalize.formatMessage(text);
                } catch(err) {
                    console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                }

                return translated; 
            }
        }             
      });
    });

    app.get("/richiedi-spid", function(request, response) {
        response.render("pages/richiedi-spid", {
            pageTitle: 'Richiedi SPID',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/infografiche", function(request, response) {
        response.render("pages/infografiche", {
            pageTitle: 'Infografiche',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/infografiche-spid-week", function(request, response) {
        response.render("pages/infografiche-spid-week", {
            pageTitle: 'Infografiche - SPID Week',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/sei-una-pubblica-amministrazione", function(request, response) {
        response.redirect("/come-diventare-fornitore-di-servizi-pubblici-e-privati-con-spid");
    });

    app.get("/come-diventare-fornitore-di-servizi-pubblici-e-privati-con-spid", function(request, response) {
        response.render("pages/come-diventare-fornitore-di-servizi-pubblici-e-privati-con-spid", {
            pageTitle: 'Come diventare fornitore di servizi pubblici e privati con SPID',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/cerca-pa", function(request, response) {
        response.render("pages/cerca-pa", {
            pageTitle: 'Cerca servizi',
            cssFiles: [...cssFiles, {
                file: 'spid-search.min.css'
            }],
            jsFiles: [...jsFiles, {
                file: 'spid-search-001a.min.js'
            }],
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }
        });
    });

    app.get("/cerca-servizi-pa/:serviceProviderId/:serviceProvider/:totalServices/:serviceProviderLogo", function(request, response) {
        response.render("pages/cerca-servizi-pa", {
            pageTitle: 'Dove puoi utilizzare SPID',
            cssFiles: [...cssFiles, {
                file: 'spid-search.min.css'
            }],
            jsFiles: [...jsFiles, {
                file: 'spid-search-001b.min.js'
            }],
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            },   
            serviceProviderId: request.params.serviceProviderId,
            serviceProvider: new Buffer(request.params.serviceProvider, 'base64').toString('utf-8'),
            totalServices: request.params.totalServices,
            serviceProviderLogo: new Buffer(request.params.serviceProviderLogo, 'base64').toString('utf-8')
        });
    });

    app.get("/serve-aiuto", function(request, response) {
        response.render("pages/serve-aiuto", {
            pageTitle: 'Supporto',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/domande-frequenti", function(request, response) {
        response.render("pages/domande-frequenti", {
            pageTitle: 'FAQ - Domande frequenti',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }   
        });
    });

    app.get("/press-area", function(request, response) {
        response.render("pages/press-area", {
            pageTitle: 'Press-Area',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }
        });
    });

    app.get("/privacy-e-note-legali", function(request, response) {
        response.render("pages/privacy-e-note-legali", {
            pageTitle: 'Privacy e Note Legali',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }
        });
    });

    /* -- <cerca servizi> -- */

    app.get("/servizi", function(request, response) {
        request.query._q = request.query._q ? request.query._q.trim() : request.query._q;
        const services = require('./services');
        services.services().then((_services) => {
            const regioni = require('../views/assets/data/regioni');
            const _regioni = sortObj(_.invert(regioni));
            const results = services.search(_services, request.query);
            const _hasQuery = (request.query && (!_.isEmpty(request.query._q) || !_.isEmpty(request.query._regione) ||
                !_.isEmpty(request.query._theme) || !_.isEmpty(request.query._subtheme)));
            response.render("pages/servizi", {
                pageTitle: 'Servizi abilitati SPID',
                cssFiles,
                jsFiles,
                helpers: {
                    _: function(text) { 
                        let translated = text;
                        try {
                            translated = request.Globalize.formatMessage(text);
                        } catch(err) {
                            console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                        }
    
                        return translated; 
                    }
                },
                _services,
                _regioni,
                _hasQuery,
                _regioniInv: regioni,
                _results: results ? sortObj(_.groupBy(results, (v) => (v.provider.name))) : null,
                _resultCount: _.size(results) || null,
                _theme: request.query._theme ? _services.APP_THEMES[request.query._theme] : null,
                _subtheme: request.query._subtheme ? _services.APP_SUBTHEMES[request.query._subtheme] : null,
                _regione: request.query._regione,
                _q: request.query._q
            });
        });
    });

    app.get("/categorie/:theme?/:subtheme?/:service?", function(request, response) {
        'use strict';

        const services_ = require('./services');
        services_.services().then((services) => {
            let _subthemes = {}

            if (request.params.subtheme) {
              const themeCode = services.APP_THEMES_SLUG[request.params.theme].theme.code
              let _services = _.filter(services.APP_SUBTHEMES_SLUG[request.params.subtheme].services, (v) => themeCode == v.themeCode)
              _subthemes = Object.assign({}, services.APP_SUBTHEMES_SLUG[request.params.subtheme], { services: _services })
            }

            response.render("pages/categorie", {
                pageTitle: 'Servizi abilitati SPID',
                cssFiles,
                jsFiles,
                helpers: {
                    _: function(text) { 
                        let translated = text;
                        try {
                            translated = request.Globalize.formatMessage(text);
                        } catch(err) {
                            console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                        }
    
                        return translated; 
                    }
                },
                _params: request.params,
                _services: services,
                _theme: request.params.theme ? services.APP_THEMES_SLUG[request.params.theme] : null,
                _subtheme: request.params.subtheme ? _subthemes : null,
                _service: request.params.services ? services.APP_SERVICES[request.params.service] : null,
            });
        });
    });

    app.post("/emptyCache", function(request, response) {
        require('./services').emptyCache();
        require('./twitter').emptyCache();
        response.json('ok');
    });

    app.get("/servizi.json", function(request, response) {
        require('./services').services().then((obj) => response.json(obj.APP_SERVICES));
    });

    /* -- </cerca servizi> -- */

    app.use(function(request, response) {
        response.statusCode = 404;
        response.render("errors/error404", {
            pageTitle: 'Errore 404 - Pagina non trovata',
            cssFiles,
            jsFiles,
            helpers: {
                _: function(text) { 
                    let translated = text;
                    try {
                        translated = request.Globalize.formatMessage(text);
                    } catch(err) {
                        console.log("Translation [i18n/" + request.cookies.lang + ".json] not found for: " + text);
                    }

                    return translated; 
                }
            }
        });
    });

};
