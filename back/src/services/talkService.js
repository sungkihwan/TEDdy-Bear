import { Talk, Topic } from "../db";

class talkService {

    static async getTalk({ talk_id }) {
        const talk = await Talk.findOneById({ talk_id })

        return talk
    }

    // static async getTalks({ perPage, page }) {
    //     const talks = await Talk.findAll({ perPage, page })
    //     return talks
    // }

    static async getTodayTalk({ size }) { // 주제를 랜덤으로 선정 -> 각 주제별로 영상 1개씩 선정
        const randomTopics = await Topic.findManyRandom(size)
        
        let topics = []
        for (let i = 0; i < randomTopics.length; i++) {
            topics.push(Object.keys(randomTopics[i])[1])
        }

        const randomTalks = await Talk.findManyRandom(topics, size)
        return randomTalks
    }
    
    static async getMyTalk({ size, user_id }) {
        const talkSize = size;
        
        const myTopics = ['technology', 'computers'] // 임시 데이터: 사용자 관심 주제
        const myTalk = await Talk.findManyRandom(myTopics, talkSize)

        return myTalk
    }
}

export { talkService }