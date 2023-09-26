const roomController = require('../controllers/rooms.controller');
const router = require('express').Router();
const jwtMiddleware = require('../middleware/jwt.middleware');

router.post('/',jwtMiddleware, roomController.create);
router.get('/', jwtMiddleware, roomController.findAll);
router.get('/:roomId',jwtMiddleware, roomController.findOne);
router.post('/:roomId',jwtMiddleware, roomController.update);
router.delete('/:roomId',jwtMiddleware, roomController.delete);
router.post("/leave/:roomId", jwtMiddleware, roomController.leaveRoom)

module.exports = router;