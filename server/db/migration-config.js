module.exports = {
    direction: 'up',
    logFileName: 'migrations.log',
    migrationsTable: 'pgmigrations',
    dir: 'migrations',
    databaseUrl: process.env.POSTGRES_URL,
};
