const { default: mongoose } = require("mongoose");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const AddressSchema = require("../models/address.js");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
    const data = req.body;
    const oldUser = await Users.findOne({ email: data.email });
    if (oldUser) {
        return res
            .status(400)
            .json({ success: false, status: "Та аль хэдийн бүртгүүлсэн байна" });
    } else {
        let hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
        data.created_date = Date("Y-m-d");
        data.last_activity = Date("Y-m-d h:m:s");

        let newUsers = new Users({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address,
            role_id: data.role_id,
            created_date: req.body.created_date,
            last_activity: req.body.last_activity,
        });
        newUsers
            .save()
            .then((data) => {
                console.log(data);
                email = data.email;
                const token = jwt.sign(
                    { user_id: data._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                res.status(200).json({
                    success: true,
                    data: data,
                    token: token,
                });
                return;
            })
            .catch(next);
    }
};

const login = async (req, res, next) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(403).json({
                success: false,
                status: "Утгуудаа бүрэн оруулна уу.",
                updated: 1,
                email: email,
                password: password,
            });
        } else {
            // Validate if user exist in our database
            const user = await Users.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // user
                return res.status(200).json({
                    success: true,
                    status: "Амжилттай нэвтэрлээ.",
                    data: user,
                    token: token,
                });
            } else {
                return res.status(401).json({
                    success: false,
                    status: "Нууц үг нэр хоорондоо таарахгүй байна.",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

module.exports = { register, login };