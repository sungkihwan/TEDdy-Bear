import { Router } from "express";
import { talkService } from "../services/talkService";

const talkRouter = Router();

// 오늘의 영상
talkRouter.get('/talks/today', async (req, res, next) => {
    try {
        const talk = await talkService.getTodayTalk();
        
        res.status(200).send(talk);
    } catch(e) {
        next(e)
    }
})

// 추천된 영상
talkRouter.get('/talks/my', async (req, res, next) => {
    try {
        const talks = await talkService.getMyTalk();

        res.status(200).send(talks);
    } catch(e) {
        next(e);
    }
})

// 영상 상세정보 조회
talkRouter.get('/talks/:talk_id', async (req, res, next) => {
    try {
        const { talk_id } = req.params;
        
        const talk = await talkService.getTalk({ talk_id });

        res.status(200).send(talk);
    } catch(e) {
        next(e);
    }
})

export { talkRouter };