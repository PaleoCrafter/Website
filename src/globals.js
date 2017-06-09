const env = process.env.NODE_ENV || 'dev';
const Globals = {
    host: env === 'dev' ? 'http://localhost:1234' : 'http://mcmoddev.com',
    endPoint: env === 'dev' ? 'http://localhost:8080/v1' : 'https://api.mcmoddev.com/v1',
};

module.exports = Globals;
