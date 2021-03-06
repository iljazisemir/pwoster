const express = require("express");
const bodyParser = require("body-parser"); // npm i -s body-parser
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const messageRoutes = require("./routes/message.routes");
require("dotenv").config({ path: "./config/.env" }); // Cacher données
require("./config/db"); // Connexion MongoDB
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors"); // Permet d'autoriser les requêtes

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // Permet de lire le body
app.use(bodyParser.urlencoded({ extended: true })); // Permet de lire les url
app.use(cookieParser()); // Permet de lire les cookies

// jwt
app.get("*", checkUser); // Permet de checker l'user sur toutes les pages du site
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/message", messageRoutes);

const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), "client", ".env.development"),
  debug: true,
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/profil/:pseudo", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/status/:postId", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/suggestions", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/messages", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get("/messages/:idMessage", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// server
const PORT = process.env.PORT;

app.listen(PORT || 3001, () => {
  console.log(`Listening on port ${PORT}`);
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
