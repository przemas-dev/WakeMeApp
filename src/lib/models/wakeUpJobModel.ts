import mongoose, { Schema, Model } from "mongoose";
import type { WakeUpJob } from "$lib/wakeUpJob";

const wakeUpJobSchema = new Schema<WakeUpJob>({
    url: { type: String, required: true },
    frequency: { type: Number, required: true },
}, { timestamps: true });


export const WakeUpJobModel: Model<WakeUpJob> = mongoose.model<WakeUpJob>("Jobs", wakeUpJobSchema);