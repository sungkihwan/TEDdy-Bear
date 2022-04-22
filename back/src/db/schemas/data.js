import { Schema, model } from 'mongoose';

const DataSchema = new Schema(
    {
      id: {
        type: String,
        required: true,
      },
      keys: [String],
      data: {
        type: Map
      }
    }
  );

const DataModel = model('Data', DataSchema);

export { DataModel };
