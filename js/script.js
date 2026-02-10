function InvalidAuthorization(response) {
    $('.loader').hide();
    showMessage('Could not authorize. Invalid e-mail or password.', 'error');
}

var RA = ResApi({
    onApiAuthorizationError: InvalidAuthorization,
    onApiCallError: function (xhr, status) {
        alert('Server error occurred, status = ' + status + '.');
        $('.loader').hide();
    },
    onApiResponseError: function (response) {
        if (response.errorCode != 401) {
            showMessage('Server error: ' + response.errorMsg, 'error');
            $('.loader').hide();
        }
    }
});

function guiHideViews() {
    $('.view').hide();
    hideMessage();
}

function showMessage(text, msgClass) {
    $('#messagePanel').removeClass();
    if (msgClass) {
        $('#messagePanel').addClass(msgClass);
    }
    $('#messagePanel .messageText').html(text);
    $('html, body').animate({scrollTop: 0}, 80);
    if ($('#messagePanel').is(':hidden')) {
        $('#messagePanel .messageClose').hide();
        $('#messagePanel').slideDown('fast', function () {
            $('#messagePanel .messageClose').show();
        });
    }
}

function hideMessage() {
    $('#messagePanel .messageClose').hide(); //to prevent close button from appearing outside of the panel
    $('#messagePanel').slideUp('fast', function () {
        $('#messagePanel .messageClose').show();
    });
}

function reloadWebsiteInspector(websiteID) {
    $('#website-loader').fadeIn().css('display', 'inline-block');
    RA.getWebsite(websiteID, function (data) {
        $('#website-loader').hide();
        if (data.website) {
            fillInWebsiteInspector(data.website)
        }
    });
}

function reloadWebsiteInspectorDomains(websiteID) {
    $('#website-domains-loader').fadeIn();
    RA.getWebsiteDomains(websiteID, function (data) {
        $('#website-domains-loader').hide();
        fillInWebsiteDomains(websiteID, data);
    });
}

function fillInWebsiteInspector(website) {
    var websiteID = website.websiteID;
    $('#website-inspector-view-btn').attr('href', website.websiteUrl);
    $('#website-inspector-id').html(website.websiteID);
    $('#website-inspector-brandname').html(website.websiteBrandname);
    $('#website-inspector-alias').html(website.websiteAlias);
    $('#add-domain-name-ok').off('click').on('click', function () {
        $('#add-domain-add-btn-panel').slideDown('fast');
        $('#add-domain-add-name-panel').slideUp('fast');
        var domain_name = $('#add-domain-name').val();
        RA.addDomain(websiteID, domain_name, function () {
            $('#add-domain-name').val('');
            reloadWebsiteInspectorDomains(websiteID);
        });
        return false;
    });
    $('#add-domain-name').val('');
    if (website.websiteIsPremiumPro) {
        $('#website-inspector-premium-enabled').html('Premium Pro Enabled');
        $('#website-inspector-premium-enable-btn').html('Enable Premium');
        $('#website-inspector-premiumplus-enable-btn').html('Enable Premium Plus');
        $('#website-inspector-premiumpro-enable-btn').html('Disable');
        $('#website-inspector-premium-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premium', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumplus-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumplus', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumpro-enable-btn').off('click').on('click', function () {
            RA.disablePremiumForWebsite(websiteID, function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    }
    else if (website.websiteIsPremiumPlus) {
        $('#website-inspector-premium-enabled').html('Premium Plus Enabled');
        $('#website-inspector-premium-enable-btn').html('Enable Premium');
        $('#website-inspector-premiumplus-enable-btn').html('Disable');
        $('#website-inspector-premiumpro-enable-btn').html('Enable Premium Pro');
        $('#website-inspector-premium-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premium', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumplus-enable-btn').off('click').on('click', function () {
            RA.disablePremiumForWebsite(websiteID, function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumpro-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumpro', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    }
    else if (website.websiteIsPremium) {
        $('#website-inspector-premium-enabled').html('Premium Enabled');
        $('#website-inspector-premium-enable-btn').html('Disable');
        $('#website-inspector-premiumplus-enable-btn').html('Enable Premium Plus');
        $('#website-inspector-premiumpro-enable-btn').html('Enable Premium Pro');
        $('#website-inspector-premium-enable-btn').off('click').on('click', function () {
            RA.disablePremiumForWebsite(websiteID, function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumplus-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumplus', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumpro-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumpro', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    }
    else {
        $('#website-inspector-premium-enabled').html('Disabled');
        $('#website-inspector-premium-enable-btn').html('Enable Premium');
        $('#website-inspector-premiumplus-enable-btn').html('Enable Premium Plus');
        $('#website-inspector-premiumpro-enable-btn').html('Enable Premium Pro');
        $('#website-inspector-premium-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premium', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumplus-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumplus', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
        $('#website-inspector-premiumpro-enable-btn').off('click').on('click', function () {
            RA.enablePremiumForWebsite(websiteID, 'premiumpro', function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    }
    $('#website-inspector-created').html(website.websiteCreated);
    $('#website-inspector-modified').html(website.websiteModified);
    $('#website-inspector-accessed').html(website.websiteAccessed);
    if (website.websiteStatus == 1) {
        $('#website-inspector-enabled').html('Enabled');
        $('#website-inspector-enable-btn').html('Disable');
        $('#website-inspector-enable-btn').show();
        $('#website-inspector-enable-btn').off('click').on('click', function () {
            RA.disableWebsite(websiteID, function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    } else if (website.websiteStatus == 4) {
        $('#website-inspector-enabled').html('Suspended');
        $('#website-inspector-enable-btn').hide();
        $('#website-inspector-enable-btn').off('click');
    } else {
        $('#website-inspector-enabled').html('Disabled');
        $('#website-inspector-enable-btn').html('Enable');
        $('#website-inspector-enable-btn').show();
        $('#website-inspector-enable-btn').off('click').on('click', function () {
            RA.enableWebsite(websiteID, function (data) {
                reloadWebsiteInspector(websiteID);
            });
            return false;
        });
    }
    $('#website-inspector-username').html(website.userName);
    $('#website-inspector-useremail').html(website.userEmail);
    $('#website-inspector-usercountry').html(website.userCountry);
    if (website.userIsConfirmed) {
        $('#website-inspector-email-confirmed').html('Yes');
    } else {
        $('#website-inspector-email-confirmed').html('No');
    }
    if (website.userIsUnsubscribed) {
        $('#website-inspector-email-unsubscribed').html('Yes');
    } else {
        $('#website-inspector-email-unsubscribed').html('No');
    }
    $('#website-inspector-login-btn').off('click').on('click', function () {
        var win = window.open('loginsite.php', '_blank');
        if (win) {
            win.websiteID = websiteID;
            win.apiToken = RA.getApiToken();
        } else {
            $('#website-loader').fadeIn().css('display', 'inline-block');
            RA.logInWebsite(websiteID, function (data) {
                $('#website-loader').hide();
                if (data.loginUrl) {
                    $('#website-inspector-open-editor-btn').fadeIn('fast');
                    $('#website-inspector-open-editor-btn').attr('href', data.loginUrl);
                }
            });
        }
    });
}

function fillInWebsiteDomains(websiteID, domains) {
    var _websiteID = websiteID;
    $('.domainlist .domainlist-domain').remove();
    if (domains.domains) {
        for (var i = 0; i < domains.domains.length; i++) {
            var domain = domains.domains[i];
            $('#add-domain-add-btn-panel').before(
                $('<div>')
                    .addClass('domainlist-domain')
                    .html(domain.domain + '&nbsp;&nbsp;')
                    .append(
                        $('<a>')
                            .addClass('action red')
                            .attr('href', '#')
                            .html('Remove')
                            .data('domainID', domain.domainID)
                            .on('click', function () {
                                $(this).fadeOut('fast');
                                RA.removeDomain(_websiteID, $(this).data('domainID'), function () {
                                    reloadWebsiteInspectorDomains(_websiteID);
                                });
                                return false;
                            })
                    )
            );
        }
    }
}

function websiteTableRowClicked() {
    guiHideViews();
    $('#viewWebsite').show();
    $('#website-inspector').hide();
    $('#website-inspector-view-btn').attr('href', '#');
    $('#website-inspector-open-editor-btn').hide();
    $('.domainlist .domainlist-domain').remove();

    var websiteID = $(this).data('websiteID');
    $('#website-loader').fadeIn();
    RA.getWebsite(websiteID, function (data) {
        $('#website-loader').hide();
        if (data.website) {
            fillInWebsiteInspector(data.website)
        }
        $('#website-inspector').show();
    });
    reloadWebsiteInspectorDomains(websiteID);
}

function logIn() {
    guiHideViews();
    $('body').addClass('logged-in');
    $('#viewWebsites').show();
    loadWebsites();
    checkPaymentStatus();
}

function logOut() {
    guiHideViews();
    $('body').removeClass('logged-in');
    $('#viewLogin').show();
    $('#signupPanel').hide();
    RA.setProperties({
        onApiAuthorizationError: InvalidAuthorization
    });
}

function filterWebsites() {
    var searchText = $('#websites-filter-searchBox').val().toLowerCase();
    var onlyShowPremium = ($('#websites-filter-premium:checked').length > 0);
    $('#websites-table').find('tr:not(:first)').each(function () {
        $(this).show();
        if (onlyShowPremium) {
            if (!$(this).data('websiteIsPremium')) {
                $(this).hide();
            }
        }
        if (searchText !== '') {
            var allText = $(this).text().toLowerCase();
            if (allText.indexOf(searchText) < 0) {
                $(this).hide();
            }
        }
    });
}

function loadWebsites() {
    $('#websites-loader').fadeIn().css('display', 'inline-block');
    RA.getWebsites(function (data) {
        $('#websites-loader').hide();
        $('#websites-table').find('tr:not(:first)').remove();
        if (data.websites) {
            for (var i = data.websites.length - 1; i >= 0; i--) {
                var site = data.websites[i];
                var newRow = $('<tr>').addClass('actInfo').click(websiteTableRowClicked);
                newRow.data('websiteID', site.websiteID);
                newRow.data('websiteIsPremium', site.websiteIsPremium || site.websiteIsPremiumPlus || site.websiteIsPremiumPro);
                $('<td>').addClass('websiteID').html(site.websiteID).appendTo(newRow);
                $('<td>').addClass('websiteCreated').html(site.websiteCreated).appendTo(newRow);
                $('<td>').addClass('websiteBrandname').html(site.websiteBrandname).appendTo(newRow);
                $('<td>').addClass('userEmail').html(site.userEmail).appendTo(newRow);
                $('<td>').addClass('actions').html(
                    $('<a class="action actView" href="' + site.websiteUrl + '" target="_blank">View</a>')
                        .on('click', function (event) {
                            event.stopPropagation();
                        })
                ).appendTo(newRow);
                $('#websites-table tr:last').after(newRow);
            }
        }
        filterWebsites();
    });

    RA.getSettings(function (settings) {
        var s_domain = 'www.mozello.com';
        var s_reseller = settings['resellerID'];
        if (settings['domain'] != '') {
            s_domain = 'backend.' + settings['domain'];
            $('a.createWebsite').attr('href', 'http://' + s_domain + '/en/session/signup/');
        } else {
            $('a.createWebsite').attr('href', 'http://www.mozello.com/en/session/signup/params/reseller/' + s_reseller + '/');
        }

    });

}

function checkPaymentStatus() {
    RA.getBalance(function (settings) {
        var pay_link = settings['signupFeeLink'];
        if ((pay_link != '') && (typeof pay_link != 'undefined')) {
            $('a.signupLink').attr('href', pay_link);
            $('.showInTrial').show();
            $('a.paidLink').on('click', function (e) {
                alert('This can be requested after the one-time signup fee is paid.');
                e.preventDefault();
            });
        } else {
            $('.showInTrial').hide();
            $('a.paidLink').off('click');
        }
    });
}

function validateURLs() {
    $('input.validate-url').each(function () {
        var url = $(this).attr('value');
        if (url != '' && typeof url != 'undefined') {
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
                $(this).attr('value', url);
            }
        }
    });
}

$(document).ready(function () {

    $('#menu a.websites').click(function () {
        guiHideViews();
        $('#viewWebsites').show();
        loadWebsites();
    });

    $('#menu a.settings, a.button.settings').click(function () {
        guiHideViews();
        $('#viewSettings').show();
        $('#formSettings input[type=text]').val('');
        $('#formSettings').hide();
        $('#settings-loader').fadeIn();
        RA.getSettings(function (settings) {
            $('#formSettings input[type=text][id^="settings-"]').each(function () {
                var id = this.id;
                id = id.replace('settings-', '');
                $(this).val(settings[id]);
            });
            if (settings['type'] == 3) {
                $('.white-label').hide();
            }
            $('#formSettings').show();
            $('#settings-loader').hide();
        });
    });

    $('#menu a.integration').click(function () {
        guiHideViews();
        $('#viewIntegration').show();
        $('#integration-info').hide();
        $('#integration-loader').fadeIn();
        RA.getSettings(function (settings) {
            var s_domain = 'www.mozello.com';
            var s_reseller = settings['resellerID'];
            if (settings['domain'] != '') {
                s_domain = 'backend.' + settings['domain'];
                var s_signup = 'http://' + s_domain + '/en/session/signup/';
                var s_login = 'http://' + s_domain + '/en/session/login/';
            } else {
                var s_signup = 'http://www.mozello.com/en/session/signup/params/reseller/' + s_reseller + '/';
                var s_login = 'http://www.mozello.com/en/session/login/params/reseller/' + s_reseller + '/';
            }
            $('a#integration-signup-url').attr('href', s_signup).html(s_signup);
            $('a#integration-login-url').attr('href', s_login).html(s_login);

            if ((settings['logoLink'] != '') && (typeof settings['logoLink'] != 'undefined')) {
                $('img#integration-logo-url').show().attr('src', settings['logoLink']);
                $('#integration-logo span.unset').hide();
            } else {
                $('img#integration-logo-url').hide();
                $('#integration-logo span.unset').show();
            }

            if ((settings['buyLink'] != '') && (typeof settings['buyLink'] != 'undefined')) {
                $('#integration-buy-url').show().attr('href', settings['buyLink']).html(settings['buyLink']);
                $('#integration-buy span.unset').hide();
            } else {
                $('#integration-buy-url').hide();
                $('#integration-buy span.unset').show();
                showMessage('You must set order page address.', 'error');
            }

            if ((settings['website'] != '') && (typeof settings['website'] != 'undefined')) {
                $('a#integration-website-url').show().attr('href', settings['website']).html(settings['website']);
                $('#integration-website span.unset').hide();
            } else {
                $('a#integration-website-url').hide();
                $('#integration-website span.unset').show();
            }

            if ((settings['domain'] != '') && (typeof settings['domain'] != 'undefined')) {
                var s_dns = 'Add a wildcard CNAME type record <b>*.' + settings['domain'] + '</b> that points to <b>r1.mozello.com</b>';
                $('#integration-domain-name').html(settings['domain']).show();
                $('#integration-domain-dns').show();
                $('#integration-domain-dns span').html(s_dns).show();
                $('#integration-domain span.unset').hide();
            } else {
                $('#integration-domain-name').hide();
                $('#integration-domain-dns').hide();
                $('#integration-domain span.unset').show();
            }

            if (settings['type'] == 3) {
                $('.white-label').hide();
            }

            $('#integration-info').show();
            $('#integration-loader').hide();
        });
    });

    $('#menu a.money').click(function () {
        guiHideViews();
        $('#viewMoney').show();
        $('#money-inspector').hide();
        $('#money-loader').fadeIn();
        RA.getBalance(function (balance) {
            $('#money-inspector span[class=money-inspector-label][id^="money-inspector-"]').each(function () {
                var id = this.id;
                id = id.replace('money-inspector-', '');
                $(this).html(balance[id]);
            });

            $('#money-inspector').show();
            $('#money-loader').hide();
        });
    });

    $('#menu a.help').click(function () {
        guiHideViews();
        $('#viewSupport').show();
    });

    $('.actInfo').click(websiteTableRowClicked);

    $('#formLogin').submit(function (event) {
        $('#login-loader').fadeIn();
        var password = $('#formLogin input[name="password"]').val();
        $('#formLogin input[name="password"]').val('');
        RA.login($('#formLogin input[name="email"]').val(), password, function () {
            $('#login-loader').hide();
            RA.setProperties({
                onApiAuthorizationError: function (response) {
                    logOut();
                }
            });
            logIn();
        });
        return false;
    });

    $('#menu a.logout').click(function () {
        RA.logout(function () {
            logOut()
        });
    });

    $('#website-inspector-open-editor-btn').on('click', function () {
        $('#website-inspector-open-editor-btn').fadeOut('fast');
    });


    $('#add-domain-add-btn').on('click', function () {
        $('#add-domain-add-btn-panel').slideUp('fast');
        $('#add-domain-add-name-panel').slideDown('fast', function () {
            $('#add-domain-name').focus();
        });
        return false;
    });

    $('#add-domain-name-cancel').on('click', function () {
        $('#add-domain-name').val('');
        $('#add-domain-add-btn-panel').slideDown('fast');
        $('#add-domain-add-name-panel').slideUp('fast');
        return false;
    });

    $('#settings-save-btn').on('click', function () {
        var settings = {};
        validateURLs();
        $('#formSettings input[type=text][id^="settings-"]:not([disabled])').each(function () {
            var id = this.id;
            id = id.replace('settings-', '');
            settings[id] = $(this).val();
        });
        var password1 = $('#password-1').val();
        var password2 = $('#password-2').val();

        if (password1 != '' || password2 != '') {
            if (password1 != password2) {
                alert("Password fields don't match");
                return false;
            }
        }

        $('#password-1').val('');
        $('#password-2').val('');

        RA.setSettings(settings, function (data) {
            if (password1 != '') {
                RA.setPassword(password1, function (data) {
                    showMessage('Settings successfully saved and password changed.', 'success');
                });
            } else {
                showMessage('Settings successfully saved.', 'success');
            }
        });
    });

    $('#messagePanel, #messagePanel .messageClose').on('click', function () {
        hideMessage();
    });

    $('#websites-filter-premium').change(function () {
        filterWebsites();
    });
    $('#websites-filter-searchBox').on('input', function () {
        filterWebsites();
    });

});