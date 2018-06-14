const client = require('firebase-tools');

client.login.ci({ localhost: true }).then((token) => {
    console.log('token', token.tokens);
    const t = token.tokens.id_token;
    return client.functions.config.set().then(console.log).catch(console.error);
    // return client.functions.config.set({token: t}, {token: t}).then(console.log).catch(console.error);
})

// client.init({ cwd: 'yo' }, { cwd: 'privet'}).then(console.log).catch(console.error);