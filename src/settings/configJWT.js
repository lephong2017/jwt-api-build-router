export const config = { 
    authority: "https://identityserverphucthinh.azurewebsites.net", 
    client_id: "local",
    redirect_uri: `http://localhost:5003/callback.html`,
    silent_redirect_uri: `http://localhost:5003/silent-renew.html`,
    response_type: "id_token token",
    scope:"openid profile api.read api.write",
    post_logout_redirect_uri :`http://localhost:5003/callback.html`,
};
// const config = { 
//     authority: "https://identityserverphucthinh.azurewebsites.net", 
//     client_id: "build",
//     redirect_uri: `https://demo-webpack.azurewebsites.net/callback.html`,
//     silent_redirect_uri: `https://demo-webpack.azurewebsites.net/silent-renew.html`,
//     response_type: "id_token token",
//     scope:"openid profile api.read api.write",
//     post_logout_redirect_uri :`https://demo-webpack.azurewebsites.net/callback.html`,
// };
// const config = { 
//     authority: "https://identityserverphucthinh.azurewebsites.net", 
//     client_id: "online",
//     redirect_uri: `https://security-api-react-identity.herokuapp.com/callback.html`,
//     silent_redirect_uri: `https://security-api-react-identity.herokuapp.com/silent-renew.html`,
//     response_type: "id_token token",
//     scope:"openid profile api.read api.write",
//     post_logout_redirect_uri :`https://security-api-react-identity.herokuapp.com/callback.html`,
// };
// const config = { 
//     authority: "https://identityserverphucthinh.azurewebsites.net", 
//     client_id: "local",
//     redirect_uri: `http://localhost:5003/callback.html`,
//     silent_redirect_uri: `http://localhost:5003/silent-renew.html`,
//     response_type: "id_token token",
//     scope:"openid profile api.read api.write",
//     post_logout_redirect_uri :`http://localhost:5003/callback.html`,
// };