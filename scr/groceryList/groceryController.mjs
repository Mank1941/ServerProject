import fs from 'fs'
import path from 'path';

import groceryItem from './groceryItem.mjs';
import groceryList from './groceryList.mjs';

export async function get_groceryLists(req, res) {
  try {
      const objs = await groceryList.getAll();
      // console.log(objs);
      res.json(objs);
  } catch (error) {
    // console.error('Error getting grocery lists:', error);
    res.status(500).json(error.message);
  }
}

export async function get_groceryList(req, res) {
  try {
    //Instead of error when null return empty
    const date = req.params.date;
    const list = await groceryList.getGroceryList(date);
    res.json(list);
  } catch (error) {
      // console.error('Error getting grocery list:', error);
      res.status(500).json(error.message);
  }
}

export async function groceryList_exists(req, res){
  try {
    const date = req.params.date;
    const list = await groceryList.getGroceryList(date);
    if(!list) {
      res.json(false)
    }else{
      res.json(true)
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function post_groceryList(req, res) {
  //Only make a new one if its a new date
  try {
    const { itemList, date, history } = req.body;
    const newList = new groceryList({ itemList, history });
    await newList.add();
    res.json(newList);
  } catch (error) {
      // console.error('Error creating grocery list:', error);
      res.status(500).json(error.message);
  }
}

export async function remove_groceryList(req, res) {
  try {
    const list = await groceryList.getGroceryList(req.params.date);
    if (list) {
        await list.remove();
        res.json({ message: 'Grocery list removed' });
    } else {
        res.status(404).json('Grocery list not found');
    }
  } catch (error) {
      // console.error('Error removing grocery list:', error);
      res.status(500).json(error.message);
  }
}

export async function post_groceryItem(req, res) {
  try {
    const { item, number, person } = req.body;
    const list = await groceryList.getGroceryList(req.params.date);
    if (list) {
        let groceryItem = await list.addItem(item, number, person);
        res.json("Grocery Item Added: "+groceryItem.toString());
    } else {
        res.json('Grocery list not found');
    }
  } catch (error) {
      // console.error('Error adding item to grocery list:', error);
      res.status(500).json(error.message);
  }
}

export async function remove_groceryItems(req, res) {
  try {
    const date = req.params.date;
    const list = await groceryList.getGroceryList(date);

    if (!list) {
      return res.status(404).json('Grocery list not found');
    }

    // Extract indices from request parameters
    const indices = req.params.index.split(',').map(index => parseInt(index));

    // Remove items at the specified indices
    const removedItems = await list.removeItems(indices);

    // Send response with the list of removed items
    res.json({ message: 'Grocery items removed', removedItems });
  } catch (error) {
      // console.error('Error removing item from grocery list:', error);
      res.status(500).json(error.message);
  }
}

export async function get_groceryItems(req, res) {
  try {
      const date = req.params.date;
      const list = await groceryList.getGroceryList(date);
      if (list) {
          const items = await list.getAllItems();
          res.json(items);
      } else {
          res.status(404).json('Grocery list not found');
      }
  } catch (error) {
      // console.error('Error getting grocery items:', error);
      res.status(500).json(error.message);
  }
}