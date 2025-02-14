const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth-middleware');
const { getAllUsers, updateUserRole, deleteUser } = require('../../controllers/admin-controller');

router.get('/users', authenticate, getAllUsers);
router.patch('/users/:userId/role', authenticate, updateUserRole);
router.delete('/users/:userId', authenticate, deleteUser);

module.exports = router;