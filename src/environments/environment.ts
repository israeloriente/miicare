declare const require: any;
export const environment = {
  production: false,
  packageJson: require('package.json'),
  serverBaseUrl: 'http://localhost:3042',
};
