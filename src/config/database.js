const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://namastedev:namastedev@namastenode.bj1tw56.mongodb.net/DevTinder',
  );
};

module.exports = connectDB;
