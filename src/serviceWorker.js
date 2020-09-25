/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import jwtDecode from './common/jwtdecode';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function urlBase64ToUint8Array(base64String) {
  let padding = '='.repeat((4 - base64String.length % 4) % 4);
  let base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  let rawData = window.atob(base64);
  let outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function register() {
  const swPath = '/serviceWorker.js';
  console.log('serviceWorker');
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swPath).then((registration) => {
        if (registration.installing) {
          console.log('Service worker installing');
          return;
        } if (registration.waiting) {
          console.log('Service worker installed');
          return;
        } if (registration.active) {
          console.log('Service worker active');
          return subscribeUserToPush(registration);
        }
      }).then((pushSubscription) => {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        // return pushSubscription;
        if (getAccessToken()) {
          return sendSubscriptionToBackEnd(pushSubscription);
        }
        return;
      });
    });
  }
}

function subscribeUserToPush(registration) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BP-HmCF4giJVZkWsxilER7S0_YDijywpvS7Q-1XrXDVQzbmZFzWFlr_MT2-rpO0kBZ_6A8yMDyOaa0gi29wdaMg'),
  };
  return registration.pushManager.subscribe(subscribeOptions);
}

function sendSubscriptionToBackEnd(subscription) {
  const { userId } = jwtDecode(getAccessToken());
  return fetch(`http://localhost:8081/api/save-subscription/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then((responseData) => {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
