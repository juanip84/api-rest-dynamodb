// Check for mandatory environment variables
const required = [
    'NODE_ENV'
];

required.forEach(param => {
    if (!process.env[param]) {
        throw new Error(`Environment parameter ${param} is missing`);
    }
});

const config = {
    env: process.env['NODE_ENV']
}

module.exports = config;