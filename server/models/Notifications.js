import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    type: { type: String, enum: ['mention', 'reply', 'follow', 'like'], required: true },
    sourceId: Schema.Types.ObjectId, // id of tweet or user triggering notification
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// TTL index - automatically deletes notifications after 30 days (2592000 seconds)
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export const Notification = model('Notification', NotificationSchema);
