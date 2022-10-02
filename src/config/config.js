const PORT = process.env.PORT || '3000';

module.exports = {
  port: PORT,
  mongoose: {
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
};
