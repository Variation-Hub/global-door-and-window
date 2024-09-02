import mongoose, { Schema, Document } from 'mongoose';

export interface ICategorySchema extends Document {
    name: string;
    subCategory: string;
    list: string[];
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    subCategory: { type: String, required: true },
    list: { type: [String], required: true },
}, { versionKey: false, minimize: false });

const Category = mongoose.model<ICategorySchema>('Category', CategorySchema);
export default Category;