const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//dev 
mongoose
    .connect(
        "mongodb+srv://fruitsalad:CRjAgdpNlEGI6hZr@cluster0-57p2a.gcp.mongodb.net/test?retryWrites=true&w=majority"
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch(console.log);

module.exports = {
    mongoose
};