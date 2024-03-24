// //*********---------------WE HAVE NOT UPDATED OUR ROUTES ACCORDING TO THIS VALIDATION---------------------------------- */

// // validationMiddleware.js
// const { validationResult } = require("express-validator");

// // Define validation rules for your specific data (e.g., user registration)
// const validateData = [
//   // Example: Validate email field
//   body("email").isEmail().withMessage("Invalid email address"),
//   // Add other validation rules as needed
// ];

// // Middleware function to handle validation
// const handleValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next(); // Proceed to the route handler if validation passes
// };

// module.exports = { validateData, handleValidation };
