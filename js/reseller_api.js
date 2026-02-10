var ResApi = function (properties) {

    var baseUrl = 'https://resellers.mozello.com/';

    var OnApiCallError = null;
    var OnApiCallSuccess = null;
    var OnApiResponseError = null;
    var OnApiAuthorizationError = null;

    var apiToken = null;

    function UpdateProperties(properties) {
        if (typeof properties.onApiCallError === 'function' || properties.onApiCallError === null)
            OnApiCallError = properties.onApiCallError;
        if (typeof properties.onApiCallSuccess === 'function' || properties.onApiCallSuccess === null)
            OnApiCallSuccess = properties.onApiCallSuccess;
        if (typeof properties.onApiResponseError === 'function' || properties.onApiResponseError === null)
            OnApiResponseError = properties.onApiResponseError;
        if (typeof properties.onApiAuthorizationError === 'function' || properties.onApiResponseError === null)
            OnApiAuthorizationError = properties.onApiAuthorizationError;
    }

    function IsApiResponseError(response) {

        if (response.error) {

            if (typeof OnApiResponseError === 'function') {
                OnApiResponseError(response);
            }

            if (response.errorCode == 401) {

                apiToken = null;

                if (typeof OnApiAuthorizationError === 'function') {
                    OnApiAuthorizationError(response);
                }
            }

            return true;
        } else {
            return false;
        }
    }

    function GetDefaultApiCallParams() {
        res = {};
        if (apiToken) {
            res.apiToken = apiToken;
        }
        return res;
    }

    var ResellersApi = {

        setProperties: function (properties) {
            UpdateProperties(properties);
        },

        getApiToken: function () {
            return apiToken;
        },

        setApiToken: function (token) {
            apiToken = token;
        },

        isAuthorized: function () {
            return (apiToken != null);
        },

        apiCall: function (endpoint, data, callback) {
            $.ajax({
                dataType: "json",
                url: baseUrl + endpoint + '?callback=?',
                data: $.param(data),
                success: function (response) {
                    if (typeof OnApiCallSuccess === 'function') {
                        OnApiCallSuccess(response);
                    }
                    if (!IsApiResponseError(response)) {
                        if (typeof callback === 'function') {
                            callback(response);
                        }
                    }

                },
                error: function (xhr, status) {
                    if (typeof OnApiCallError === 'function') {
                        OnApiCallError(xhr, status);
                    }
                }
            });
        },

        login: function (email, password, callback) {
            var data = {
                email: email,
                password: password
            };
            this.apiCall('api/authorize/', data, function (response) {
                if (response.apiToken) {
                    apiToken = response.apiToken;
                }
                if (typeof callback === 'function') {
                    callback(response);
                }
            });
        },

        logout: function (callback) {
            this.apiCall('api/authorize/logout/', GetDefaultApiCallParams(), function (response) {
                apiToken = null;
                if (typeof callback === 'function') {
                    callback(response);
                }
            });
        },

        getWebsites: function (callback) {
            this.apiCall('api/websites/', GetDefaultApiCallParams(), callback);
        },

        getWebsite: function (id, callback) {
            this.apiCall('api/website/' + id + '/', GetDefaultApiCallParams(), callback);
        },

        getWebsiteDomains: function (id, callback) {
            this.apiCall('api/website/' + id + '/domains/', GetDefaultApiCallParams(), callback);
        },

        enableWebsite: function (id, callback) {
            this.apiCall('api/website/' + id + '/enable/', GetDefaultApiCallParams(), callback);
        },

        disableWebsite: function (id, callback) {
            this.apiCall('api/website/' + id + '/disable/', GetDefaultApiCallParams(), callback);
        },

        enablePremiumForWebsite: function (id, plan, callback) {
            if (plan === true || plan === 'premiumplus') {
                this.apiCall('api/website/' + id + '/enable_premium/premiumplus/', GetDefaultApiCallParams(), callback);
            }
            else if (plan === 'premiumpro') {
                this.apiCall('api/website/' + id + '/enable_premium/premiumpro/', GetDefaultApiCallParams(), callback);
            }
            else {
                this.apiCall('api/website/' + id + '/enable_premium/premium/', GetDefaultApiCallParams(), callback);
            }
        },

        disablePremiumForWebsite: function (id, callback) {
            this.apiCall('api/website/' + id + '/disable_premium/', GetDefaultApiCallParams(), callback);
        },

        logInWebsite: function (id, callback) {
            this.apiCall('api/website/' + id + '/login/', GetDefaultApiCallParams(), callback);
        },

        addDomain: function (id, domain, callback) {
            var data = GetDefaultApiCallParams();
            data.domain = domain;
            this.apiCall('api/website/' + id + '/domain/add/', data, callback);
        },

        removeDomain: function (id, domain_id, callback) {
            this.apiCall('api/website/' + id + '/domain/' + domain_id + '/remove/', GetDefaultApiCallParams(), callback);
        },

        getSettings: function (callback) {
            this.apiCall('api/settings/', GetDefaultApiCallParams(), callback);
        },

        setSettings: function (settings, callback) {
            var send_settings = settings;
            send_settings.apiToken = apiToken;
            this.apiCall('api/settings/set/', send_settings, callback);
        },

        setPassword: function (new_password, callback) {
            var send_data = {password: new_password};
            send_data.apiToken = apiToken;
            this.apiCall('api/password/set/', send_data, callback);
        },

        getBalance: function (callback) {
            this.apiCall('api/balance/', GetDefaultApiCallParams(), callback);
        }
    };

    UpdateProperties(properties);

    return ResellersApi;

};