import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const findUser = (req, res) => { 
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
            const q = `SELECT username FROM users WHERE email LIKE "${req.params.name}"`;   
            db.query(q, (err, data) => {
                if (err) return res.status(500).json(err);

                return res.status(200).json(data[0]);
            });
    //     }
    // })
};

export const addRatingRecipe = (req, res) => {
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
        // if (err) return res.status(403).json("Token is not valid!");

            const values = [
                req.body.rating,
                req.body.review
            ]
            const q = `UPDATE ${req.params.cooking} SET rating=?, review=? WHERE id = ?`;
            db.query(q, [...values, req.params.id], (err, data) => {
                if (err) return res.status(500).send(err);        
                return res.status(200).json(data);
            });

    // })
};

export const editRecipe = (req, res) => {
    // const token = req.cookies.access_token;    
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
            const values = [
                req.body.name,
                req.body.ingredients,
                req.body.cooking,
                req.body.img_main,
                req.body.type,
                req.body.veg,
                req.body.note,
                req.body.cook,
            ]
            const q = `UPDATE ${req.params.cooking} SET name=?, ingredients=?, cooking=?, img_main=?, type=?, veg=?, note=?, cook=? WHERE id = ?`;
            db.query(q, [...values, req.params.id], (err, data) => {
                if (err) return res.status(500).send(err);
                return res.status(200).json(data);
            });
    //     }
    // })
};

export const getSearchRecipes = (req, res) => {
    const q = `SELECT * FROM ${req.query.type} WHERE name LIKE ${req.query.text}`;
    db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);        
    return res.status(200).json(data);
    });
};

export const getRecipe = (req, res) => {
    const q = `SELECT * FROM ${req.params.cooking} WHERE id=?`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err);        
    return res.status(200).json(data);
    }); 
};

export const addRecipe = (req, res) => {
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
            const values = [
                req.body.name,
                req.body.ingredients,
                req.body.cooking,
                req.body.img_main,
                req.body.type,
                req.body.veg,
                req.body.note,
                req.body.review,
                req.body.cook,
                req.body.username,
                req.body.date
            ]
            const q = `INSERT INTO ${req.body.typeRecipe} (name, ingredients, cooking, img_main, type, veg, note, review, cook, username, date) VALUES (?)`;
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).send(err);    
            return res.status(200).json(data);
            });
    //     }
    // })
};

export const getRecipes = (req, res) => {
    const q = req.query.type
    ? `SELECT * FROM ${req.params.cooking} WHERE type="${req.query.type}"`
    : `SELECT * FROM ${req.params.cooking}`;
    db.query(q, [req.query.type], (err, data) => {
        if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getCookingSingle = (req, res) => { 
      const q =
      `SELECT * FROM ${req.params.cooking} WHERE id = ? `;
      db.query(q, [req.params.id], (err, data) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json(data[0]);
       }); 
  };

export const deleteKitchenSingle = (req, res) => { 
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated!");
    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     else {
                const recipeId = req.params.id;
                const q = `DELETE FROM ${req.params.cooking} WHERE id = ?`;    
                db.query(q, [recipeId], (err, data) => {
                if (err) return res.status(403).json("You can delete only your recipe!");
                return res.json("Recipe has been deleted!");
            });
    //     }
    // })
};





// export const getPosts = (req, res) => {
//   const q = req.query.cat
//     ? "SELECT `*` FROM posts WHERE cat=?"
//     : "SELECT * FROM posts";

//   db.query(q, [req.query.cat], (err, data) => {
//     if (err) return res.status(500).send(err);

//     return res.status(200).json(data);
//   });
// };


// export const getPost = (req, res) => {
//   const q =
//     "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

//   db.query(q, [req.params.id], (err, data) => {
//     if (err) return res.status(500).json(err);

//     return res.status(200).json(data[0]);
//   });
// };

// export const addPost = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q =
//       "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

//     const values = [
//       req.body.title,
//       req.body.desc,
//       req.body.img,
//       req.body.cat,
//       req.body.date,
//       userInfo.id,
//     ];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been created.");
//     });
//   });
// };

// export const deletePost = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const postId = req.params.id;
//     const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

//     db.query(q, [postId, userInfo.id], (err, data) => {
//       if (err) return res.status(403).json("You can delete only your post!");

//       return res.json("Post has been deleted!");
//     });
//   });
// };

// export const updatePost = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const postId = req.params.id;
//     const q =
//       "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

//     const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

//     db.query(q, [...values, postId, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been updated.");
//     });
//   });
// };
