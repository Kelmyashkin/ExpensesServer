module.exports = {
  app: {
    name: 'Expenses Server',
    version: '0.0.1',
  },
  server: {
    port: 3001,
  },
  database: {
    link: 'mongodb://localhost:27017/expenses',
  },
};
