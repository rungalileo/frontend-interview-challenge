import { NextApiRequest, NextApiResponse } from 'next';
import { recipes } from '../../data/recipes.json';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id = 0 } = req.query;

  const recipeId = parseInt(id as string, 10);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe == null) {
    res.status(404).json({
      message: 'Recipe not found',
    });
  }

  setTimeout(() => {
    res.status(200).json({
      data: recipe,
    });
  }, 2000)
};

export default handler;