const mongoose = require('mongoose');
const urlDB = process.env.URL_MONGODB;
mongoose.connect(urlDB)
.then(() => console.log("mongoDB connected"))
// .catch(err => console.log('err: ' + err))

module.export = mongoose