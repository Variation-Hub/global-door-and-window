import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, },
    phone: { type: String, required: true },
    message: { type: String, required: true },
}, { versionKey: false, minimize: false });


const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;