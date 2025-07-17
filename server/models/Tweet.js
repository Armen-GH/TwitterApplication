import { Schema, model } from 'mongoose';

const TweetSchema = new Schema({
    //author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: Number, required: true }, // Postgres user ID
    text: { type: String, maxlength: 280 },
    media: [
        {
            url: String,
            type: { type: String, enum: ['image', 'video'] }
        }
    ],
    hashtags: [String],
    mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    inReplyTo: { type: Schema.Types.ObjectId, ref: 'Tweet' },
    retweetOf: { type: Schema.Types.ObjectId, ref: 'Tweet' },
    createdAt: { type: Date, default: () => new Date(), index: true }
}, { timestamps: true });

// Create index on createdAt (additional if needed, but it's indexed above)
TweetSchema.index({ createdAt: 1 });

export const Tweet = model('Tweet', TweetSchema);
