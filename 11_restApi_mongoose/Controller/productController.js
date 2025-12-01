const products = await productModel.aggregate([
  //   { $match: { isStock: true, price: { $gte: 5.0 } } },
  { $match: { isStock: true } },
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      sumOfPrice: { $sum: "$price" },
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      sumOfPrice: 1,
      avgPrice: 1,
      maxPrice: 1,
      minPrice: 1,
      priceDiffMaxPriceToMinPrice: {
        $subtract: ["$maxPrice", "$minPrice"],
      },
    },
  },
  //const products = await productModel.aggregate([
  //   { $match: { isStock: true, price: { $gte: 5.0 } } },
  //   { $match: { isStock: true } },
  //   {
  //     $group: {
  //       _id: "$category",
  //       avgPrice: { $avg: "$price" },
  //       sumOfPrice: { $sum: "$price" },
  //       maxPrice: { $max: "$price" },
  //       minPrice: { $min: "$price" },
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]);
]);
return res.status(201).json({
  s: true,
  m: "all data",
  products,
  totalProducts: products.length,
});
