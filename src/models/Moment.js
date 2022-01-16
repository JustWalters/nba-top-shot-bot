const mongoose = require('mongoose');

const { getSeriesNumber } = require('../utils');

const { Schema } = mongoose;

const momentSchema = new Schema(
  {
    url: { type: Schema.Types.String, required: true },
    playerName: { type: Schema.Types.String, required: true },
    playCategory: { type: Schema.Types.String, required: true },
    at: { type: Schema.Types.Date, required: true },
    setName: { type: Schema.Types.String, required: true },
    setSeriesNumber: { type: Schema.Types.Number, required: true },
    // TODO: Validate if the moment of an alert is actually this moment
    alerts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Alert', require: true }],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

momentSchema.index({ playerName: 1 });

momentSchema.virtual('description').get(function getDescription() {
  const date = new Date(this.at).toDateString();
  const seriesNumber = getSeriesNumber(this.setSeriesNumber);
  return `${this.playerName} ${this.playCategory} ${date} ${this.setName} (Series ${seriesNumber})`;
});

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;
