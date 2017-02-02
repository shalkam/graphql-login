import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
var user = new mongoose.Schema({ _id: { type: String } });

user.plugin(passportLocalMongoose);
export default mongoose.model('user', user);
