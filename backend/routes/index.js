const router = require('express').Router();

router.use('/users', require('./user/users'));
router.use('/users', require('./user/sign_up'));

router.use('/videos', require('./video/video_stream'));
router.use('/notifications', require('./notification/push_notifications'));

router.use('/socialposts', require('./social_post/socialposts'));
router.use('/advertisements', require('./advertisement/advertisements'));
router.use('/pages', require('./page/pages'));
router.use('/books', require('./book/books'));
router.use('/sports', require('./sport/sports'));

router.use('/friends', require('./friend_requests/friend_request_accept'));



module.exports = router;