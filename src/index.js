import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Main from './containers/Main/Main';

const fbPromise = new Promise(resolve => {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1484351495017321',
            cookie: true,
            xfbml: true,
            version: 'v2.11'
        });
        FB.AppEvents.logPageView();
        resolve(FB);
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

ReactDOM.render(
    <Main fb={fbPromise} />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
