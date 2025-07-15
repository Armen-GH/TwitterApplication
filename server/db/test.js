import { pgPool, mongo } from './index.js';
import mongoose from "mongoose";

async function test() {
    try {
        await pgPool.query('SELECT NOW()');
        console.log('Postgres OK');
        await mongoose.connection.once('open', () => console.log('MongoDB OK'));
    } catch (err) {
        console.error(err);
    } finally {
        await pgPool.end();
        await mongoose.disconnect();
    }
}
test();