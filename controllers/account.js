import { db } from "../db.js";
import jwt from "jsonwebtoken";
import SendOutlook from './services/SendOutlook.js';


export const sendMail = (req,res) =>  {
    const token = req.cookies.access_token;
    console.log ("token", token)
    const {email, message, subject, html} = req.body;
    if (!token) return res.status(401).json("Not authenticated!");
    return res.json({result: SendOutlook.send(email, message, subject, html)})
};


export const getUser = (req, res) => { 
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
                const userId = req.params.id;
                const q = "SELECT `id`,`username`, `email`, `img`, `add_email`, `first_name`, `last_name`, `birth_day`, `public_name`, `public_img`, `site`, `instagram`, `facebook`, `twitter` FROM users WHERE id=?";   
                db.query(q, [userId], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data[0]);
                });
        //     }
        // })
};

export const getSavedRecipes = (req, res) => { 
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
        // if (err) return res.status(403).json("Token is not valid!");
        // else {
                const userId = req.params.id;
                const q = "SELECT `saved_recipes` FROM users WHERE id=?";   
                db.query(q, [userId], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data[0]);
                });
        // }
    // })
};

export const updateSavedRecipes = (req, res) => { 
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
            const values = [
                req.body.saved_recipes,        
            ];
            const q = "UPDATE users SET `saved_recipes`=? WHERE `id`=?";   
            db.query(q, [...values, req.params.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data[0]);
            });
    //     }
    // })
};

export const updateUser  = (req, res) => {
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
            
            const values = [
                req.body.first_name,
                req.body.last_name,
                req.body.birth_day,
                req.body.id,
            ];
            const q = "UPDATE users SET `first_name`=?, `last_name`=?, `birth_day`=? WHERE `id`=?";
            db.query(q, [...values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Data has been changed.");
            });
    //     }
    // })
};

export const updatePublicUser  = (req, res) => {
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
                const values = [
                    req.body.public_name,
                    req.body.public_img,
                    req.body.site,
                    req.body.instagram,
                    req.body.facebook,
                    req.body.twitter,
                    req.body.id,
                ];
                const q = "UPDATE users SET `public_name`=?, `public_img`=?, `site`=?, `instagram`=?, `facebook`=?, `twitter`=? WHERE `id`=?";
                db.query(q, [...values], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.json("Data has been changed.");
            });
    //     }
    // })
};  



