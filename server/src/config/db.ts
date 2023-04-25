import mongoose, { ConnectOptions } from "mongoose";

function connect(DBURL: string) {
    mongoose
        .connect(DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log("err", err);
        });
}

export default { connect };
