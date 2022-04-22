import { Data } from '../db';

class dataService {
    static async findById(id) {
      return await Data.findById(id);
    }

    static async findAll() {
        return await Data.findAll();
    }
}
  
export { dataService };
  