import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { Tweet } from '../models/Tweet.js'; // Adjust if needed

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log('🌿 Connected to MongoDB');

const userIds = [
    '64d123456abc123456def123', // Replace with actual ObjectId strings from MongoDB
    '64d123456abc123456def124',
    '64d123456abc123456def125',
];

async function seedMongo() {
    try {
        for (let i = 0; i < 100; i++) {
            await Tweet.create({
                author: faker.helpers.arrayElement(userIds),
                text: faker.lorem.sentence(),
                media: [],
                hashtags: faker.lorem.words(2).split(' '),
                mentions: [],
                createdAt: faker.date.recent(10),
            });
        }

        console.log('✅ MongoDB seeding complete');
    } catch (err) {
        console.error('❌ MongoDB seeding error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seedMongo();