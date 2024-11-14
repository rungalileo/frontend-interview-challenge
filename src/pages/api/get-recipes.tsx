import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data/recipes.json';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const recipes = data.recipes;

  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedRecipes = recipes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recipes.length / limitNumber);
  const nextStartingToken = endIndex < recipes.length ? pageNumber + 1 : null;

  setTimeout(() => {
    res.status(200).json({
      data: paginatedRecipes,
      limit: limitNumber,
      nextStartingToken,
      page: pageNumber,
      total: recipes.length,
      totalPages,
    });
  }, 2000); // 2-second delay
};

export default handler;