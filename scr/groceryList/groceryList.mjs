import groceryItem from "./groceryItem.mjs";
import { getDb, connectToDB } from "../util/mongo_db.mjs";

async function get_grocery_collection(){
    let db = await getDb();
    return await db.collection(`GroceryCollection`);
}

class groceryList {
    constructor({
        itemList = [],
        date = new Date().toISOString().slice(0, 10),
        history = []
    } = {}) {
        this.itemList = itemList
        this.date = date;
        this.history = history
    }

    toString() {
        let itemListString = this.itemList.map(item => item.toString()).join("\n");
        return `Date: ${this.date}\nItems:\n${itemListString}`;
    }

    static async load() {
        try {
            connectToDB();
            return `Contact correctly inserted in the Database`;
        } catch (error) {
            console.error(`Error connecting to the database: `, error);
            throw error;
        }
    }

    static async getAll() {
        let collection = await get_grocery_collection();
        let objs = await collection.find({}).toArray();
        return objs.map(obj => new groceryList(obj));
    }

    static async getGroceryList(date) {
        let collection = await get_grocery_collection();
        let obj = await collection.findOne({ "date": date })
        return obj ? new groceryList(obj) : null;
    }

    async add() {
        const collection = await get_grocery_collection();
        await collection.insertOne(this);
    }

    async remove() {
        const collection = await get_grocery_collection();
        await collection.deleteOne({ date: this.date});
    }

    async addItem(item, number, person) {
        const newItem = new groceryItem(item, number, person);
        this.itemList.push(newItem);
        await this.update();
        return newItem;
    }

    async removeItems(indices) {
        const removedItems = [];

        indices.sort((a, b) => b - a); // Sort indices in descending order to avoid shifting indexes
        indices.forEach(index => {
            if (index >= 0 && index < this.itemList.length) {
                removedItems.push(this.itemList[index]); // Add removed item to the array
                this.itemList.splice(index, 1);
            }
        });

        // Update the grocery list in the database
        await this.update();

        return removedItems; 
    }

    async getAllItems() {
        return this.itemList;
    }

    async getItem(index) {
        return this.itemList(index);
    }

    async update() {
        const collection = await get_grocery_collection();
        await collection.updateOne({ date: this.date }, { $set: { itemList: this.itemList } });
    }
}

export default groceryList