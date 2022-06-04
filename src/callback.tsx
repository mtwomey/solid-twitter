/* @refresh reload */
import { render } from 'solid-js/web';

function Callback () {
    debugger
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem('twitterAuthCode', params.get('code'));
    window.close();
    return <></>
};

render(() => <Callback />, document.getElementById('root') as HTMLElement);
