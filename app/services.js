'use strict';

const slug = require('slug');
const _ = require('lodash');
const sortObj = require('sort-object');
const fs = require('fs');
const bluebird = require('bluebird');
const readTextFile = _.partial(bluebird.promisify(fs.readFile), _, {
    encoding: 'utf8',
    flag: 'r'
});
const readJsonFile = filename => readTextFile(filename).then(JSON.parse);

const _getServices = (APP_PROVIDERS_, APP_SERVICES_) => {
    let APP_PROVIDERS = APP_PROVIDERS_,
        APP_SERVICES = APP_SERVICES_,
        APP_THEMES = {},
        APP_SUBTHEMES = {};

    APP_SERVICES.forEach((service) => {
        const themeSlug = slug(service.themeDescription).toLowerCase().substr(0, 64),
            subThemeSlug = slug(service.subThemeDescription).toLowerCase().substr(0, 64);

        service.provider = APP_PROVIDERS[service.serviceProviderId];

        APP_THEMES[service.themeCode] = APP_THEMES[service.themeCode] || {};

        APP_THEMES[service.themeCode].theme = {
            description: service.themeDescription,
            slug: themeSlug,
            code: service.themeCode
        };

        APP_SUBTHEMES[service.subThemeCode] = APP_SUBTHEMES[service.subThemeCode] || {};
        APP_SUBTHEMES[service.subThemeCode].subtheme = {
            description: service.subThemeDescription,
            slug: subThemeSlug,
            code: service.subThemeCode
        };

        APP_SUBTHEMES[service.subThemeCode].services = APP_SUBTHEMES[service.subThemeCode].services || {};
        APP_SUBTHEMES[service.subThemeCode].services[service.serviceName] = service;

        APP_THEMES[service.themeCode].subthemes = APP_THEMES[service.themeCode].subthemes || {};
        APP_THEMES[service.themeCode].subthemes[service.subThemeCode] = APP_SUBTHEMES[service.subThemeCode];
    });

    // sort by description

    APP_THEMES = sortObj(APP_THEMES, {
        sort: (a, b) => (APP_THEMES[a].theme.description < APP_THEMES[b].theme.description ? -1 : 1)
    });

    _.keys(APP_THEMES).forEach((k) => {

        let subthemes = APP_THEMES[k].subthemes;
        subthemes = sortObj(subthemes, {
            sort: (a, b) => (subthemes[a].subtheme.description < subthemes[b].subtheme.description ? -1 : 1)
        });
        APP_THEMES[k].subthemes = subthemes;

    });

    const APP_THEMES_SLUG = _.zipObject(_.map(APP_THEMES, (v) => v.theme.slug), _.values(APP_THEMES))
    const APP_SUBTHEMES_SLUG = _.zipObject(_.map(APP_SUBTHEMES, (v) => v.subtheme.slug), _.values(APP_SUBTHEMES))

    return {
        APP_SERVICES,
        APP_PROVIDERS,
        APP_THEMES,
        APP_SUBTHEMES,
        APP_THEMES_SLUG,
        APP_SUBTHEMES_SLUG
    };
}

const search = (services, params) => {
    const results = {};

    let found = !(_.isEmpty(params._q) && _.isEmpty(params._regione) &&
        _.isEmpty(params._theme) && _.isEmpty(params._subtheme));

    if (found) {
        services.APP_SERVICES.forEach(function(service) {
            found = true;
            let _q = params._q ? params._q.toLowerCase() : null;

            if (!_.isEmpty(_q)) {
                found = found && (_q &&
                    (service.name && -1 !== service.name.toLowerCase().indexOf(_q) ||
                    (service.serviceName && -1 !== service.serviceName.toLowerCase().indexOf(_q)) ||
                    (service.description && -1 !== service.description.toLowerCase().indexOf(_q)) ||
                    (service.entityName && -1 !== service.entityName.toLowerCase().indexOf(_q)) ||
                    (service.subThemeDescription && -1 !== service.subThemeDescription.toLowerCase().indexOf(_q)) ||
                    (service.provider && service.provider.city && -1 !== service.provider.city.toLowerCase().indexOf(_q))));
            }

            if (!_.isEmpty(params._regione)) {
                found = found && service.provider && service.provider.regionCode === params._regione;
            }

            if (!_.isEmpty(params._theme)) {
                found = found && service.themeCode === params._theme;
            }

            if (!_.isEmpty(params._subtheme)) {
                found = found && service.subThemeCode === params._subtheme;
            }

            if (found) {
                results[service.id] = service;
            }
        });
    }
    return !_.isEmpty(results) ? results : null;
}

let _CACHE = null;

const emptyCache = () => (_CACHE = null);

const services = () => {
    if (_CACHE) {
        /* @FIXME: race condition here */
        return Promise.resolve(_CACHE);
    }
    return readJsonFile('views/assets/data/vServiceProviders.json')
        .then((ar) => ar.reduce((pre, cur) => {
            // transform providers array into object keyed by provider id
            pre[cur.id] = cur;
            return pre;
        }, {}))
        .then((providers) => readJsonFile('views/assets/data/vServices.json')
            .then((obj) => _getServices(providers, obj))
            .then((obj) => _CACHE = obj))
};

module.exports = {
    emptyCache,
    services,
    search,
}
