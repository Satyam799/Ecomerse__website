//Create product Id
//private
//Post product/:id/reviews
const { asynchandler } = require("../middleware/asyncmiddleware");
const Product = require("../Modal/productmodal");

const Review = require("../Modal/Reviewmodal");

const Reviewscreation = asynchandler(async (req, res) => {
  const findingreviews = await Product.findById(req.params.id).populate(
    "reviews",
    "user"
  );

  const checking = findingreviews.reviews.find((el) =>
    el.user.equals(req.user._id)
  );
  console.log(checking);

  if (checking) {
    return res.status(400).json({
      message: "User Review already exists",
    });
  }

  const productpushing = await Product.findById(req.params.id);

  const Createreview = await Review.create({
    name: req.body.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
    user: req.user?._id,
  });

  productpushing.reviews.push(Createreview._id);
  await productpushing.save();

  res.status(200).json({
    Createreview,
  });
});

module.exports = { Reviewscreation };

/*if(Createreview){
await Product.findById(req.params.id).reviews.push(Createreview?._id)
}

console.log(Createreview) */
