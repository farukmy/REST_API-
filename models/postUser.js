import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
  },
  phone_number: {
    type: String,
    required: [true, "Please add phone number"],
  },
});
const PostUser = mongoose.model("PostUser", postSchema);
export default PostUser;
