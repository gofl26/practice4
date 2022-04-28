const express = require('express');
const Post = require('../schemas/post');
const User = require('../schemas/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
//multer-s3 미들웨어 연결
require('dotenv').config();
const authMiddleware = require('../middlewares/auth-middleware');

// 게시글 조회
router.get('/postList', authMiddleware, async (req, res, next) => {
    const { user } = res.locals;
    const { userId } = user;
    const intList = [];

    try {
        const totalList = await Post.find();
        const likeList = await User.find({ userId }, like);

        for (let i = 0; i < totalList.length; i++) {
            for (let j = 0; j < likeList.length; j++) {
                if (totalList[i].postId === likeList[j]) {
                    intList.push(totalList[i].postId);
                }
            }
            res.status(200).json({ totalList, intList });
        }
    } catch (err) {
        res.status(400).json({ msg: '게시글이 조회되지 않았습니다.' });
        next(err);
    }
});

//게시글 작성
router.post('/postWrite', authMiddleware, async (req, res) => {
    //작성한 정보 가져옴
    const {
        postTitle,
        postDesc,
        postCategory,
        datemate,
        maxMember,
        gender,
        adress,
        latitude,
        longitude,
        age,
        status,
    } = req.body;
    console.log(content, imageUrl);
    // 사용자 브라우저에서 보낸 쿠키를 인증미들웨어통해 user변수 생성
    const { user } = res.locals;
    const userId = user.userId;
    // 글작성시각 생성
    require('moment-timezone');
    moment.tz.setDefault('Asia/Seoul');
    const createdAt = String(moment().format('YYYY-MM-DD HH:mm:ss'));
    try {
        const postList = await Post.create({
            userId,
            postTitle,
            postDesc,
            postCategory,
            datemake: createdAt,
            datemate,
            maxMember,
            nowMember,
            gender,
            adress,
            latitude,
            longitude,
            age,
            status,
        });
        res.send({ result: 'success', postList });
    } catch {
        res.status(400).send({ msg: '게시글이 작성되지 않았습니다.' });
    }
});

// 게시글 수정 페이지
router.post('/postsEdit/:postId', authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { postTitle, postDesc, postCategory } = req.body;

    if (!postTitle.length || !postDesc.length || !postCategory.length) {
        res.status(400).send({ msg: '내용을 입력해주세요.' });
        return;
    }

    try {
        await Post.updateOne(
            { _id: postId },
            { $set: { postTitle, postDesc, postCategory } }
        );

        res.send({ result: 'success', postList });
    } catch {
        res.status(400).send({ msg: '게시글이 수정되지 않았습니다.' });
    }
});

// 게시글 삭제
router.delete('/postDelete/:postId', authMiddleware, async (req, res) => {
    const { postNum } = req.params;

    try {
        await Post.deleteOne({ _id: postId });
        res.send({ result: 'success' });
    } catch {
        res.status(400).send({ msg: '게시글이 삭제되지 않았습니다.' });
    }
});

// // 참여버튼
// router.post("postPush/:postId", authMiddleware, async (req, res) => {

// })

module.exports = router;
