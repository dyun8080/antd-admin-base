const apiBase = 'https://sanhuiapi.fongwell.com'

export default {
	port: 7000,
	apiBase,
	oauth: {
		// serverClientId: 'TxxGjYZCAUbQgxipKzWZtjvYugGGoQdVIYSUSvAhqKWPlWNyqdZSOOIMVcUJQLFw',
		// serverClientSecret: 'iFAeXVElWvIqHFJFrAmpeFpizMTLJiYx',
		serverClientId: 'YnjssiuWaofJYzLk',
		serverClientSecret: '7tdZfDcUelnqsJR4DRf1KibD2wCNg4znH7rVBNsbd8xBcGQRCygoW7Ht3PqAg9Rd',
		serverAccessTokenUrl: `${apiBase}/oauth/token`,
	},
}
