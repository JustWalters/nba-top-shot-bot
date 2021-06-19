const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // telegramUsername: { type: Schema.Types.String },
    clientUsername: { type: Schema.Types.String },
    // telegramChatId: { type: Schema.Types.Number, required: true, unique: true },
    clientId: { type: Schema.Types.String, required: true, unique: true },
    nbaTopShotUsername: { type: Schema.Types.String, unique: true },
    // TODO: Validate if the user of an alert is actually this user
    watchedAlerts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Alert', require: true }],
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
