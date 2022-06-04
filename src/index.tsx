/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

const authUri = 'https://twitter.com/i/oauth2/authorize';
const params = {
  response_type: 'code',
  client_id: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
  redirect_uri: 'https://solid-twitter.herokuapp.com/callback/',
  scope: 'tweet.read',
  state: 'state',
  code_challenge: 'challenge',
  code_challenge_method: 'plain'
}
const fullUrl = `${authUri}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;

function authInit() {
  console.log(fullUrl);
  window.open(fullUrl, 'authWindow', 'height=700,width=500');
}

const [twitterCode, setTwitterCode] = createSignal('Unknown');

window.addEventListener("storage", () => {
  console.log('something happened');
  setTwitterCode(localStorage.getItem('twitterAuthCode'));
}, false);

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
