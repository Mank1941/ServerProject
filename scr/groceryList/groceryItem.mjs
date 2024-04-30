// Define the Item class
class groceryItem {
    constructor(item, number, person) {
      this.item = item;
      this.number = number;
      this.person = person;
      this.checked = false
    }
  
    // Method to get a string representation of the item
    toString() {
      return `${this.item}, ${this.number}, ${this.person}, ${this.checked}`;
    }
}

export default groceryItem