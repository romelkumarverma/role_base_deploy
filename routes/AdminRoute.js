// import express from 'express';
// import Getuser from '../controllers/Admin.js'; // Import the named exports
// import deleteUser from '../controllers/Admin.js'
// import isAdmin from '../middleware/verifyToken.js';

// const AdminRoutes = express.Router();

// AdminRoutes.get('/getuser', isAdmin, Getuser);
// AdminRoutes.post('/delete/:id', isAdmin, deleteUser); // Use the correct function here

// export default AdminRoutes;


import express from 'express';
import { Getuser, deleteUser } from '../controllers/Admin.js'; // Use destructuring to import
import isAdmin from '../middleware/verifyToken.js';

const AdminRoutes = express.Router();

AdminRoutes.get('/getuser', isAdmin, Getuser);
AdminRoutes.post('/delete/:id', isAdmin, deleteUser); // Use the correct function here

export default AdminRoutes;
