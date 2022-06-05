/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import qs from 'qs';
import axios from 'axios';

function authInit() {
  const authUri = 'https://twitter.com/i/oauth2/authorize';
  const params = qs.stringify({
    response_type: 'code',
    client_id: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
    redirect_uri: `${window.location.href}callback/`,
    scope: 'tweet.read',
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain'
  });
  const fullUrl = `${authUri}?${params}`;

  window.open(fullUrl, 'authWindow', 'height=700,width=500');
}

const [twitterCode, setTwitterCode] = createSignal('Unknown');

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
      let x = result;
      let y = x;
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
      Authorize Twitter here --->
      <button onClick={authInit}> Authorize </button>
      <p>Auth Code: {twitterCode}</p>
      <p>Still have to exchange it for a token</p>
    </div>
  );
};

render(() => <Auth />, document.getElementById('root') as HTMLElement);
