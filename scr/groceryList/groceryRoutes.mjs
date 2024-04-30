
import express from 'express';
import { get_groceryLists, get_groceryList, post_groceryList, remove_groceryList, post_groceryItem, remove_groceryItems, get_groceryItems, groceryList_exists  } from "./groceryController.mjs";

const groceryRoutes = express.Router();

groceryRoutes.get('/', get_groceryLists); //Get All Grocery Lists
groceryRoutes.get('/:date', get_groceryList); //Get Grocery List
groceryRoutes.post('/', post_groceryList); //Add Grocery List
groceryRoutes.delete('/:date', remove_groceryList); //Remove Grocery List
groceryRoutes.post('/:date/addItem', post_groceryItem); //Add Grocery Item
groceryRoutes.delete('/:date/removeItem/:index', remove_groceryItems); //Remove Grocery Item
groceryRoutes.get('/:date/items', get_groceryItems); //Get Grocery Items
groceryRoutes.get('/:date/exists', groceryList_exists); //Get Grocery Items


export default groceryRoutes;