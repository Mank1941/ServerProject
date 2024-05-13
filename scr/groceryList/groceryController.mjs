import fs from 'fs'
import path from 'path';

import {createGroceryItem, findGroceryItems, updateGroceryItem, deleteGroceryItems } from './groceryItem.mjs';

export async function post_groceryItem(io, req, res) {
  try {
    const { item, number, person } = req.body;
    const objs = await createGroceryItem(item, number, person);

    // Emit 'listUpdated' event to all connected clients
    io.emit('listUpdated');

    res.json(objs);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function get_groceryList(req, res) {
  try {
    const objs = await findGroceryItems()
    res.json(objs);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function update_groceryItem(req, res) {
  try {
    await updateGroceryItem(id, update)
    res.json("Updated")
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function delete_groceryItems(req, res) {
  try {
    const indices = req.params.indices.split(',');

    const items = await findGroceryItems();

    const selectedItems = indices.map(index => items[index]);
    const ids = selectedItems.map(item => item._id);

    const result = await deleteGroceryItems(ids)

    // Emit 'listUpdated' event to all connected clients
    // io.emit('listUpdated');

    res.json(`Deleted ${result.deletedCount} items`)
    // res.json()
  } catch (error) {
    res.status(500).json(error.message);
  }
}

