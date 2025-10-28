import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

export const getCategoryContents = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const data = await categoryService.getCategoryContents(Number(id), user_id);
        res.json(data);
    } catch (error) {
        console.error('Error fetching category contents:', error);
        res.status(500).json({ message: 'Error fetching category contents' });
    }
};
