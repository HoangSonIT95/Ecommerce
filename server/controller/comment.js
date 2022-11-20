import Comment from '../models/Comment.js';

export const commentProduct = async (req, res, next) => {
  try {
    const idProduct = req.params.prodId;
    const comment_product = await Comment.find({ idProduct: idProduct });
    res.status(200).json(comment_product);
  } catch (err) {
    return next(err);
  }
};

export const sendComment = async (req, res, next) => {
  try {
    const idProduct = req.params.prodId;
    const idUser = req.body.idUser;
    const fullName = req.body.fullName;
    const content = req.body.content;
    const star = req.body.star;

    const data = {
      idProduct,
      idUser,
      fullName,
      content,
      star,
    };

    await Comment.insertMany(data)
      .then(result => {
        res.send('Success');
      })
      .catch(err => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};
