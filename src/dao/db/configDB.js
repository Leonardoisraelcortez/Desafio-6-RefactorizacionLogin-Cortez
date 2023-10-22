import mongoose from "mongoose";

const URI =
"mongodb+srv://leonardoisraelcortez:xOvbuIBDknKVq0Ge@micluster.vjzdtbr.mongodb.net/ecommerce?retryWrites=true&w=majority";

const dbConnection = mongoose
.connect(URI)
.then(() => {
    console.log("DB connected");
})
.catch((err) => {
    console.log(err);
});

export default dbConnection;
