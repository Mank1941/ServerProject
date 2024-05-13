
import express from 'express';
import { post_groceryItem, get_groceryList, delete_groceryItems } from "./groceryController.mjs";
import { io } from '../app.mjs';

const groceryRoutes = express.Router();

groceryRoutes.get('', get_groceryList); //Get Grocery List
groceryRoutes.post('/addItem', (req, res) => post_groceryItem(io, req, res)); //Add Grocery Item
groceryRoutes.delete('/removeItems/:indices', delete_groceryItems)


export default groceryRoutes;