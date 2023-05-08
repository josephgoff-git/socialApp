import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register function
export const register = (req,res)=>{
    //Check if the user exists 
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username],(err,data)=>{
        // If there was an error
        if(err) return res.status(500).json(err)

        // If the data array returned has any contents, the username is already in the database
        if(data.length) return res.status(409).json("User already exists!")

        // Otherwise, create a new user - hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // Insert user into the database with 4 required values
        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name,]

        db.query(q,[values],(err,data)=>{
            // If there was an error entering into the database
            if(err) return res.status(500).json(err)
            
            // Otherwise, the user was successfully created
            return res.status(200).json("User has been created.")
        })
    })
}

// Login Function
export const login = (req,res)=>{

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username],(err,data)=>{
        // If there is an error
        if(err) return res.status(500).json(err)

        // If the data array returned was empty, nothing was found
        if(data.length === 0) return res.status(404).json("User not found!");

        // Otherwise, assume user was found and array with one item was returned - decrypt password
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        
        // If user entered the wrong password for given username
        if (!checkPassword) return res.status(400).json("Wrong password or username!")
        
        // Otherwise, login was succesfull 
        // Establish a secret key for the user 
        const token = jwt.sign({ id: data[0].id }, "secretkey");

        // destructure data[0] so others is everything except the password
        const {password, ...others} = data[0]
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

// Logout function
export const logout = (req,res)=>{
    res.clearCookie("accessToken", {
        secure: true,
        // Given server is on port 8800 and site is on 3000, we can still clear cookies 
        sameSite:"none"
    }).status(200).json("User has been logged out")
} 