import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    subCategory: string;
    type: string;
    createdAt: Date;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    images: { type: [String] },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false, minimize: false });

const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
