import { Talk, Topic } from "../db";

class talkService {

    static async getTalk({ talk_id }) {
        const talk = await Talk.findOneById({ talk_id })
        console.log(talk)
        return talk
    }

    static async getTalks({ perPage, page }) {
        const talks = await Talk.findAll({ perPage, page })
        return talks
    }

    static async getTodayTalk() {
        const topicSize = 4
        const randomTopics = await Topic.findManyRandom(topicSize)
        
        let topics = []
        for (let i = 0; i < randomTopics.length; i++) {
            topics.push(Object.keys(randomTopics[i])[1])
        }
        const talkSize = 4
        const randomTalks = await Talk.findManyRandom(topics, talkSize)

        return randomTalks
    }
    
    static async getMyTalk() {
        const talkSize = 4
        
        const myTopics = ['technology', 'computers'] // 임시 데이터: 사용자 관심 주제

        const myTalk = await Talk.findManyRandom(myTopics, talkSize)

        return myTalk
    }
}

export { talkService }