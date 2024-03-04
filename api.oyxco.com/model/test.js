import mongoose from '../db'

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String,
  age: Number
})

const Test = mongoose.model('Test', TestSchema, 'Tests');

export default Test