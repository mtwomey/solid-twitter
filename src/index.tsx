/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import qs from 'qs';
import axios from 'axios';
import 'uno.css';

const [twitterAuthCode, setTwitterAuthCode] = createSignal('Unknown');
const [twitterAuthResult, setTwitterAuthResult] = createSignal('Unknown');

const [instagramAuthCode, setInstagramAuthCode] = createSignal('Unknown');
const [instagramAuthResult, setInstagramAuthResult] = createSignal('Unknown');

function authTwitterInit() {
  const authUri = 'https://twitter.com/i/oauth2/authorize';
  const params = qs.stringify({
    response_type: 'code',
    client_id: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
    redirect_uri: `${window.location.href}twitter-callback/`,
    scope: 'tweet.read users.read',
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain'
  });
  const fullUrl = `${authUri}?${params}`;

  window.addEventListener("storage", handleTwitterLocalStorageEvent, { once: true });

  window.open(fullUrl, 'authWindow', 'height=700,width=500');
}

function handleTwitterLocalStorageEvent(e) {
  if (Object.keys(e.storageArea).includes('twitterAuthCode')) {
    const twitterAuthCode = localStorage.getItem('twitterAuthCode');
    localStorage.removeItem('twitterAuthCode');
    setTwitterAuthCode(twitterAuthCode); // This doesn't necessairly happen right away....

    const target = 'https://api.pearpop-dev.com/v1/socialproxy/twitter/userInfo';
    // const target = 'http://localhost:4000/socialproxy/twitter/userInfo';
    try {
      axios.post(target, {
        code: twitterAuthCode,
        clientId: 'ZGFZeGV6MmRZNkdBNXY0MVdGeW06MTpjaQ',
        redirectUri: `${window.location.href}twitter-callback/`,
        codeVerifier: 'challenge'
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
  }
}

function authInstagramInit() {
  const authUri = 'https://api.instagram.com/oauth/authorize';
  const params = qs.stringify({
    response_type: 'code',
    client_id: '1537776126616540',
    redirect_uri: `${window.location.href}instagram-callback/`,
    // redirect_uri: 'https://fe16-173-15-87-25.ngrok.io/instagram-callback/',
    scope: 'user_profile,user_media',
  });
  const fullUrl = `${authUri}?${params}`;

  window.addEventListener("storage", handleInstagramLocalStorageEvent, { once: true });

  window.open(fullUrl, 'authWindow', 'height=700,width=500');
}

function handleInstagramLocalStorageEvent(e) {
  if (Object.keys(e.storageArea).includes('instagramAuthCode')) {
    const instagramAuthCode = localStorage.getItem('instagramAuthCode');
    localStorage.removeItem('instagramAuthCode');
    setInstagramAuthCode(instagramAuthCode); // This doesn't necessairly happen right away....

    const target = 'https://api.pearpop-dev.com/v1/socialproxy/instagram/userInfo';
    // const target = 'http://localhost:4000/socialproxy/instagram/userInfo';
    try {
      axios.post(target, {
        redirect_uri: '`${window.location.href}instagram-callback/`',
        code: instagramAuthCode
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        setInstagramAuthResult(JSON.stringify(response.data, null, 2));
      })
    } catch (e) {
      let x = e;
    }
  }
}

function Auth() {
  return (
    <div>
      {/* Twitter */}
      <div class="flex border-solid border-0 border-b-2 pb3">
        <div class="text-2xl font-mono font-medium">Authorize Twitter</div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-mono text-xs font-thin py-2 px-4 rounded border-0 ml3" onClick={authTwitterInit}> Authorize </button>
      </div>
      <div class="text-2xl font-mono font-medium mt3">Auth Code</div>
      <div class="text-red-400 text-lg font-mono font-thin">{twitterAuthCode}</div>
      <div class="text-2xl font-mono font-medium mt3">Result</div>
      <div class="text-green-600 text-lg font-mono font-thin whitespace-pre">{twitterAuthResult}</div>

      {/* Instagram */}
      <div class="flex mt5 border-solid border-0 border-b-2 pb3">
        <div class="text-2xl font-mono font-medium">Authorize Instagram</div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-mono text-xs font-thin py-2 px-4 rounded border-0 ml3" onClick={authInstagramInit}> Authorize </button>
      </div>
      <div class="text-2xl font-mono font-medium mt3">Auth Code</div>
      <div class="text-red-400 text-lg font-mono font-thin">{instagramAuthCode}</div>
      <div class="text-2xl font-mono font-medium mt3">Result</div>
      <div class="text-green-600 text-lg font-mono font-thin whitespace-pre">{instagramAuthResult}</div>
    </div>
  );
};

render(() => <Auth />, document.getElementById('root') as HTMLElement);
