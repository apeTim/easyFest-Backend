import mongoose from 'mongoose';
import { DB_URL } from '../config/config';

(async () => {
    try {
        await mongoose.connect(DB_URL, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Successful connect to database!`);
    } catch (e) {
        console.error(`Can\`t connect to database, error: ${e.message}\n${e.stack}`);
        process.exit(-1);
    }
})();

export default mongoose;