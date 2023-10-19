const productRepo = require("../mocks/mockProductRepo")();

const listProducts = (req, res, next) => {
  try {
    return res.json(productRepo.items());
  } catch (err) {
    next(err);
  }
};

const addProduct = (req, res, next) => {
  const { body: productData } = req;

  console.log(typeof productData);
  try {
    const createdItemId = productRepo.add(productData);
    return res.status(201).json({ id: createdItemId });
  } catch (err) {
    next(err);
  }
};

const updateProduct = (req, res, next) => {
  const { id } = req.params;
  const { body: updates } = req;
  console.log(typeof id);

  try {
    productRepo.update(id, updates);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = productRepo.delete(id);
    if (!deleted) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const getProduct = (req, res, next) => {
  const { id } = req.params;

  try {
    return res.json(productRepo.get(id));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct
};
