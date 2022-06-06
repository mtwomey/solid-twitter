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

const [twitterCode, setTwitterCode] = createSignal('Unknown');
const [twitterAuthResult, setTwitterAuthResult] = createSignal('Unknown');

function handleLocalStorageEvent(e) {
  if (Object.keys(e.storageArea).includes('twitterAuthCode')) {
    setTwitterCode(localStorage.getItem('twitterAuthCode'));

    axios.post('https://api.twitter.com/2/oauth2/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        code: twitterCode(),
        grant_type: 'authorization_code',
        client_id: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
        redirect_uri: 'http://127.0.0.1:3000/callback/',
        code_verifier: 'challenge'
      })
    }).then(result => {
    }).catch(error => {
      console.log(error);
    });

    // window.removeEventListener("storage", handleLocalStorageEvent, false); // If we want to remove it
  }
}

window.addEventListener("storage", handleLocalStorageEvent, false);

function Auth () {
  return (
    <div>
      <h2>Authorize Twitter</h2>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-0" onClick={authInit}> Authorize </button>
      <h2>Auth Code</h2>
      <h4 class="text-red-400">{twitterCode}</h4>
      <h2>Result</h2>
      <h4 class="text-green-600">{twitterAuthResult}</h4>
      <p>Still have to exchange it for a token</p>
    </div>
  );
};

render(() => <Auth />, document.getElementById('root') as HTMLElement);
