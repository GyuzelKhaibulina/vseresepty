import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendOutlook from './services/SendOutlook.js';

export const checkTempPassword  = (req, res) => {
    const q = "SELECT password FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        const isPasswordCorrect = bcrypt.compareSync(
               req.body.code,
               data[0].password
        );  
        if (err) return res.status(500).json(err);
        if (isPasswordCorrect) return res.status(200).json("Верный код."); 
        else return res.status(404).json("Пользователь не найден.");                
    });
  };

export const sendRegisterMail = (req,res) =>  {
    const {email, message, subject, html} = req.body;
    return res
        .json({result: SendOutlook.send(email, message, subject, html)})
};

export const checkResetKey = (req, res) => { 
    const q = "SELECT username FROM users WHERE email = ? AND key_link=?";
    db.query(q, [req.body.email, req.body.key_link], (err, data) => {
        if (data.length>0) {
            return res.status(200).json("Ok");
        }
        else res.status(500).send(err);      
    });
};


export const resetPassword = (req, res) => {  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q = `UPDATE users SET password=?, key_link="" WHERE email=?`;
    db.query(q, [hash, req.body.email], ((err, data) => {
        if (err) return res.status(500).json(err);
        return res
            .clearCookie("access_token", {sameSite:"none", secure:true})
            .clearCookie("code", {sameSite:"none", secure:true})        
            .status(200).json("Ok");
    }))
}

export const addCode = (req, res) => {  
    const q = `UPDATE users SET key_link=? WHERE email=?`;
    db.query(q, [req.body.key_link, req.body.email], ((err, data) => {
        if (err) return res.status(500).json(err);
        return res  
            .status(200).json(data[0]);
    }))
}

export const resetPasswordAuth = (req, res) => {  
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Пользователь не найден.");
      return res.status(200).json("Ок");
    });
}

export const temporaryRegister = (req, res) => {
        const q = "SELECT * FROM temporary_users WHERE email = ? OR username = ?";
        db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length>0) return res.status(409).json("Пользователь c таким email уже зерегистрирован.");
        const q = "INSERT INTO temporary_users(`username`,`email`, `code`) VALUES (?)";
        const values = [req.body.username, req.body.email, req.body.code];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Пользователь успешно создан.");
        });   
    }); 
  };

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length>0) return res.status(409).json("Пользователь c таким email уже зерегистрирован.");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users(`username`,`email`,`password`,`saved_recipes`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash, req.body.saved_recipes];
    db.query(q, [values], (err, data) => {
       if (err) return res.status(500).json(err);
       return res
                .status(200).json("Пользователь успешно создан.");
    });
  });
};

export const checkCodeRegister  = (req, res) => {
    const q = "SELECT email FROM temporary_users WHERE email = ? AND code=?";
    db.query(q, [req.body.email, req.body.code], (err, data) => {
        if (data.length>0) {
            return  res.cookie("code", req.body.code, {httpOnly: true,}).status(200).json(data)
        }
        else res.status(500).send("Не верный код"); 
        if (err) return res.status(500).send(err);        
    });
  };

export const addUser  = (req, res) => {  
    const code = req.cookies.code;
    if (code===req.body.code) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.code, salt);
        const q = "INSERT INTO users SET email=? , username=?, password=?, saved_recipes=?"
            db.query(q, [req.body.email, req.body.username, hash, req.body.saved_recipes], (err, data) => {
            if (err) return res.status(500).send(err);        
            return res.status(200).json(data);
        });
    }
    else return res.status(406).json("Срок действия кода истек");
};

export const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res
                .clearCookie("code", {sameSite:"none", secure:true})
                .cookie("access_token", token, {httpOnly: true})                
                .status(401).json("Not authenticated!");
    }
    else {
        return res.status(200).json(token);
    }
  };

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Пользователь не найден.");
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password.toString(),
      data[0].password
    ); 
    if (!isPasswordCorrect)
    return res.status(400).json("Неверный пользователь или пароль.");
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .clearCookie("code", {sameSite:"none", secure:true})
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {sameSite:"none", secure:true})
    .clearCookie("code", {sameSite:"none", secure:true})
    .status(200).json("Пользователь вышел из системы.")
};


