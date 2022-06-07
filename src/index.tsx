/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import qs from 'qs';
import axios from 'axios';
import 'uno.css';

function authInit() {
  const authUri = 'https://twitter.com/i/oauth2/authorize';
  const params = qs.stringify({
    response_type: 'code',
    client_id: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
    redirect_uri: `${window.location.href}callback/`,
    scope: 'tweet.read users.read',
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain'
  });
  const fullUrl = `${authUri}?${params}`;

  window.open(fullUrl, 'authWindow', 'height=700,width=500');
}

const [twitterAuthCode, setTwitterAuthCode] = createSignal('Unknown');
const [twitterAuthResult, setTwitterAuthResult] = createSignal('Unknown');

function handleLocalStorageEvent(e) {
  if (Object.keys(e.storageArea).includes('twitterAuthCode')) {
    const twitterAuthCode = localStorage.getItem('twitterAuthCode');
    setTwitterAuthCode(twitterAuthCode); // This doesn't necessairly happen right away....

    const target = 'https://api.pearpop-dev.com/v1/socialproxy/twitter/userInfo';
    // const target = 'http://localhost:4000/socialproxy/twitter/userInfo';
    try {
      axios.post(target, {
        code: twitterAuthCode,
        clientId: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
        redirectUri: `${window.location.href}callback/`
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        setTwitterAuthResult(JSON.stringify(response.data, null, 2));
      })
    } catch (e) {
      let x = e;
    }
    debugger
  }
}

window.addEventListener("storage", handleLocalStorageEvent, false);

function Auth() {
  return (
    <div>
      <h2>Authorize Twitter</h2>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-0" onClick={authInit}> Authorize </button>
      <h2>Auth Code</h2>
      <h4 class="text-red-400 text-lg">{twitterAuthCode}</h4>
      <h2>Result</h2>
      <pre class="text-green-600 text-lg">{twitterAuthResult}</pre>
    </div>
  );
};

render(() => <Auth />, document.getElementById('root') as HTMLElement);
