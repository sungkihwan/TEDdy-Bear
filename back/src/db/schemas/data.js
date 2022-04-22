import { Schema, model } from 'mongoose';

const DataSchema = new Schema({ any: Schema.Types.Mixed });

const DataModel = model('Data', DataSchema);

export { DataModel };
