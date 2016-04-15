'use strict';

(function() {
    var jsdoSession,
        jsdoSettings = {
            serviceURI: 'http://localhost:8810/Pallet_Audit',
            catalogURIs: 'http://localhost:8810/Pallet_Audit/static/Pallet_AuditService.json',
            authenticationModel: 'anonymous'
        },
        userFunctions = {
            currentUser: function _currentUser() {
                if ($) {
                    var promise = $.Deferred();
                    window.setTimeout(function() {
                        promise.reject();
                    }, 0);
                    return promise;
                }
                return null;
            },
            login: function _login(email, password, done, fail) {
                var promise = jsdoSession.login(email, password);
                promise.done(done);
                promise.fail(fail);
            },
            register: function _register(email, password, attrs, done, fail) {
                return done();
            }
        },
        loadCatalogs = function _loadCatalogs() {
            var promise = $.Deferred(),
                addCatalogFunc = function() {
                    var addCatalog = jsdoSession.addCatalog(jsdoSettings.catalogURIs);
                    addCatalog.done(function _addCatalogDone() {
                        promise.resolve(arguments);
                    });
                    addCatalog.fail(function _addCatalogDone() {
                        promise.reject(arguments);
                    });
                };
            if (jsdoSession && jsdoSession.catalogURIs && jsdoSession.catalogURIs.length) {
                promise.resolve();
            } else {
                if (jsdoSettings.authenticationModel === 'anonymous' && jsdoSession.loginResult !== progress.data.Session.LOGIN_SUCCESS) {
                    var login = jsdoSession.login('', '');
                    login.done(function() {
                        addCatalogFunc();
                    });
                    login.fail(function() {
                        promise.reject(arguments);
                    });
                } else {
                    addCatalogFunc();
                }
            }
            return promise;
        };
    progress.util.jsdoSettingsProcessor(jsdoSettings);
    jsdoSession = new progress.data.JSDOSession(jsdoSettings);
    app.data.progressDataProvider = {
        settings: jsdoSettings,
        session: jsdoSession,
        Users: userFunctions,
        loadCatalogs: loadCatalogs
    };
}());

// START_CUSTOM_CODE_progressDataProvider
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_progressDataProvider