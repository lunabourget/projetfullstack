"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryContents = exports.getCategories = void 0;
const category_service_1 = require("../services/category.service");
const categoryService = new category_service_1.CategoryService();
const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};
exports.getCategories = getCategories;
const getCategoryContents = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const data = await categoryService.getCategoryContents(Number(id), user_id);
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching category contents:', error);
        res.status(500).json({ message: 'Error fetching category contents' });
    }
};
exports.getCategoryContents = getCategoryContents;
