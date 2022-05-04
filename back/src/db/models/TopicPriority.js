import { TopicPriorityModel } from "../schemas/topicPriority";

class TopicPriority {
    static create({ user_id }) {
        return TopicPriorityModel.create({ user: user_id })
    }
}

export { TopicPriority };
