import mongoose, { Document, Model } from "mongoose";

export interface ISnip extends Document {
  snipSender: string;
  snipText: string;
}

const SnipSchema = new mongoose.Schema({
  snipSender: String,
  snipText: String,
});

const Snip: Model<ISnip> = mongoose.model<ISnip>("Snip", SnipSchema);
export default Snip;
