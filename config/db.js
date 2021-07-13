const mongoose = require("mongoose");

mongoose
  .connect(
    // `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.bkarb.mongodb.net/clonetwitter`,
    `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.bkarb.mongodb.net/clonetwitter?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
