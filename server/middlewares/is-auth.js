// export const isAuth = (req, res, next) => {
//   if (!req.user) {
//     return res.status(403).json('Not logged in yet');
//   }
//   next();
// };

// export const isUser = (req, res, next) => {
//   isAuth(req, res, next, () => {
//     if (req.user._id === req.params.userId || req.user.role === 'admin') {
//       next();
//     } else return res.status(403).json('Unauthorized');
//   });
// };

// export const isConselors = (req, res, next) => {
//   isAuth(req, res, next, () => {
//     if (req.user.role === 'conselors' || req.user.role === 'admin') {
//       next();
//     } else return res.status(403).json('Unauthorized');
//   });
// };

// export const isAdmin = (req, res, next) => {
//   isAuth(req, res, next, () => {
//     if (req.user.role === 'admin') {
//       next();
//     } else return res.status(403).json('Unauthorized');
//   });
// };
