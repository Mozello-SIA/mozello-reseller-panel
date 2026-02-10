$(document).ready(function () {
    if (window.websiteID && window.apiToken) {
        var RA = ResApi({});
        RA.setApiToken(window.apiToken);
        RA.logInWebsite(window.websiteID, function (data) {
            if (data.loginUrl) {
                window.location.href = data.loginUrl;
            }
        })
    } else {
        window.close();
    }
});