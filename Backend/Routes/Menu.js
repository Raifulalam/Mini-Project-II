const express = require('express');
const router = express.Router();
const Menu = require('../Model/Menu')

// Create a new menu item
router.post('/', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).json(menu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ error: 'Menu item not found' });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a menu item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedMenu) return res.status(404).json({ error: 'Menu item not found' });
        res.json(updatedMenu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) return res.status(404).json({ error: 'Menu item not found' });
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
