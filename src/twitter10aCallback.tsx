/* @refresh reload */
import { render } from 'solid-js/web';

function Callback () {
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem('twitter10aOauthVerifier', params.get('oauth_verifier'));
    window.close();
    return <></>
};

render(() => <Callback />, document.getElementById('root') as HTMLElement);
