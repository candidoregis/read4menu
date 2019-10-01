/* eslint-disable camelcase */
// console.log('this is loaded');

exports.GOOGLE_APPLICATION_CREDENTIALS = {
  type: process.env.GOOGLECLOUD_TYPE,
  project_id: process.env.GOOGLECLOUD_PROJECT_ID,
  private_key_id: process.env.GOOGLECLOUD_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLECLOUD_PRIVATE_KEY,
  client_email: process.env.GOOGLECLOUD_CLIENT_EMAIL,
  client_id: process.env.GOOGLECLOUD_CLIENT_ID,
  auth_uri: process.env.GOOGLECLOUD_AUTH_URI,
  token_uri: process.env.GOOGLECLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLECLOUD_AUTH_PROV_X509,
  client_x509_cert_url: process.env.GOOGLECLOUD_CLIENT_X509
};
