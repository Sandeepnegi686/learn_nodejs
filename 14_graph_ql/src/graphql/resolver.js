const ProductModel = require("../Model/ProductModel");

const resolvers = {
  Query: {
    products: async () => await ProductModel.find({}),
    product: async (_, { id }) => await ProductModel.findById(id),
  },
  Mutation: {
    createProduct: async (_, { ...product }) =>
      await ProductModel.create({ ...product }),
    deleteProduct: async (_, { id }) => {
      const deletedDocument = await ProductModel.findByIdAndDelete(id);
      if (deletedDocument) return true;
      return false;
    },
  },
};

module.exports = resolvers;
