

import db from "../config/dbConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const registerController = async (req, res) => {
    const { name, email, password, date_of_creation } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !date_of_creation) {
        console.log("not all the fields")
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const answer = await db.query("SELECT name,email FROM users WHERE name=$1 OR email=$2", [name, email]);
        if (answer.rows.length > 0) {
            console.log("user is already created")
            return res.status(400).json({ message: "user is already registered" });
        }
        const hash = await bcrypt.hash(password, 10);
        const data = await db.query("INSERT INTO users (name,email,password,date_of_creation) VALUES ($1,$2,$3,$4) RETURNING id,name"
            , [name, email, hash, date_of_creation]);
        const accessToken = jwt.sign({ id: data.rows[0].id, name: name }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME });
        const refreshToken = jwt.sign({ id: data.rows[0].id, name: name }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIME });
        return res.status(200).json({
            message: "created",
            id:data.rows[0].id,
            name:data.rows[0].name,
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    }
    catch (error) {
        console.log(error.message);

        if (process.env.NODE_ENV === "test") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        } else {
            console.log("error of server")
            return res.status(500).json({ message: "Error during registration or database operation" });
        }
    }

};


const loginController = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const data = await db.query("SELECT id,name,password,email,date_of_creation FROM users WHERE name=$1", [name]);
        if (data.rows.length === 0) {
            return res.status(400).json({ message: "user not found" });

        }
        const hashedPassword = data.rows[0].password;
        const compare = await bcrypt.compare(password, hashedPassword);
        if (!compare) {
            return res.status(400).json({ message: "wrong username or passowrd" });
        }
        const { email, date_of_creation } = data.rows[0];
        const accessToken = jwt.sign({ id: data.rows[0].id, name: name }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME });
        const refreshToken = jwt.sign({ id: data.rows[0].id, name: name }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIME });
        res.status(202).json({
            message: "Loged in",
            id:data.rows[0].id,
            name: name,
            email: email,
            date_of_creation: date_of_creation,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (error) {
        console.log(error.message);

        if (process.env.NODE_ENV === "test") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        } else {
            return res.status(500).json({ message: "Error during login or database operation" });
        }
    }
};

const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const newAccessToken = jwt.sign(
            { id: decoded.id, name: decoded.name },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME }
        );
        res.status(200).json({ accessToken: newAccessToken });
    }   catch (error) {
        console.log(error.message);

        if (process.env.NODE_ENV === "development") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        } else {
            return res.status(500).json({ message: "Error during making token" });
        }
    }
};



export default { registerController, loginController, refreshTokenController };