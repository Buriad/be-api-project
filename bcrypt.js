const bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);
bcrypt.hash("password", salt).then((data) => console.log(data));