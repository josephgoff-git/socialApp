import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import messageRoutes from "./routes/messages.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import storyRoutes from "./routes/stories.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/stories", storyRoutes)

app.listen(8800, ()=> {
    console.log("API working!")
})

app.get("/users", (req, res) => {
    // Logic to fetch user data from the database or other source
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    
    res.json(users);
  });

  app.use((err, req, res, next) => {
    console.log("there is an error")
    console.error(err); // Log the error stack trace
    res.status(500).send('Internal Server Error!!'); // Send a 500 response to the client
  });
  



