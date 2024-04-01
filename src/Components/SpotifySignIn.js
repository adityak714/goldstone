import React, {useEffect, useState} from 'react';
import '../css/Spotify.css';

const SpotifySignIn = () => {    
    const scope = 'user-read-private user-read-email';
    /**
     * 1) authURL -> sign in to spotify, then user receives an auth token
     * 2) url -> auth token -> access token
     */
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // TODO: Fix security issue of not revealing clientID in plain sight
    const clientId = '874bc05370b64a2d9d57276668c96649';
    // TODO: .env file that can say whether the website is in deployment mode, or localhost mode 
    // (URL should be dynamic)
    const redirectUri = 'http://localhost:3000/';

    // Code verifier creation as first step to the auth process
    const generateRandomString = (length) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    // Convert to SHA256
    const sha256 = async (plain) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    }    

    // Show the previously generated digest in base64 format 
    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    /**
     * Authorization with Proof Key of Code Exchange (PKCE) Flow
     * - A unique key is made
     * - A code verifier is present in Goldstone, that verifies every request
     *   sent from it to Spotify. Confirmed with S256.
     * - GET /authorize is sent as a request, and the code-challenge is passed in, as well 
     *   as which method was elected (enter "S256")
     * - User then is redirected to the official sign-in page of Spotify
     * 
     * 
     * https://accounts.spotify.com/authorize?
     * response_type=code
     * &client_id=874bc05370b64a2d9d57276668c96649
     * &scope=user-read-private+user-read-email
     * &code_challenge_method=S256
     * &code_challenge=GaB8nECQ1p9BWDXP0_YI4ycFSEyWGt2vn57zw524EuQ
     * &redirect_uri=http%3A%2F%2Flocalhost%3A3000
     */
    
    const getToken = async () => {
      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
    
      // This is on Goldstone's side, that verifies handshakes with Spotify's authentication process
      window.localStorage.setItem('code_verifier', codeVerifier);
  
      const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      }    

      // Redirects to the Spotify login page
      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    }

    const checkAuth = async () => {
      // After a successful sign-in, an authorization code is generated, that can be 
      // used with the Playback features of Spotify to have audio/music playback possible
      // on the particular application. 
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');
      
      if (urlParams.get('error') !== undefined) {
        console.log("Sign-In Failed.");
      } else {
        // was made in the previous step
        let verifier = window.localStorage.getItem('code_verifier');
      
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: verifier,
          }),
        }
        
        // Endpoint where the access token is received, by giving the auth token first
        // NOTE: This is different from the authURL that first logs you into your account, and you get an auth token from there.
        const url = new URL("https://accounts.spotify.com/api/token")

        const body = await fetch(url, payload);
        const response = await body.json();
      
        // If status was 200 OK then make a variable in local storage with the access token
        // -> Used later to do playback, access playlist to choose to be added with the timer etc.
        window.localStorage.setItem('access_token', response.access_token);
      }
    }

    useEffect(() => {
      checkAuth().then(() => {
        console.log("Access Token Created.");
      });     
    }, [])

    return (
      <div className='signInButton' onClick={async () => await getToken()}>
          Sign In
      </div>
    )
}

export default SpotifySignIn;