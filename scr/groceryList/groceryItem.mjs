// Define the Item class
import mongoose from 'mongoose'

const groceryItemSchema = new mongoose.Schema({
  item: String,
  number: Number,
  person: String,
  date: String,
  checked: { type: Boolean, default: false }
});

// Create a model based on the schema
const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

groceryItemSchema.methods.toString = function() {
  return `${this.item}, ${this.number}, ${this.person}, ${this.date}, ${this.checked}`;
};

export async function createGroceryItem(item, number, person) {
  const date = new Date().toISOString().slice(0, 10)

  const newItem = new GroceryItem({ item, number, person, date });
  await newItem.save();
  return newItem
}

export async function findGroceryItems() {
  return await GroceryItem.find();
}

export async function updateGroceryItem(id, update) {
  await GroceryItem.findByIdAndUpdate(id, update);
}

export async function deleteGroceryItems(ids) {
  return await GroceryItem.deleteMany({ _id: { $in: ids } });
  // await GroceryItem.findByIdAndDelete(id);
}

