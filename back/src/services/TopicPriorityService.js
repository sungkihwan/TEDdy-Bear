import { TopicPriority } from "../db";

class TopicPriorityService {
  static async plusPriorities({ user_id, topics, point }) {
    const myTopicPriority = await TopicPriority.findOne({ user_id });
    for (let i = 0; i < topics.length; i++) {
      myTopicPriority.priority.set(topics[i], myTopicPriority.priority.get(topics[i]) + point);
    }
    myTopicPriority.save();
    return;
  }

  static async minusPriorities({ user_id, topics, point }) {
    const myTopicPriority = await TopicPriority.findOne({ user_id });
    for (let i = 0; i < topics.length; i++) {
      myTopicPriority.priority.set(topics[i], myTopicPriority.priority.get(topics[i]) - point);
    }
    myTopicPriority.save();
    return;
  }
}

export { TopicPriorityService };
