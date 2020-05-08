const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require("./routes/user");
const authenticationRoutes = require("./routes/authentication");
const adminRoutes = require("./routes/admin");
const covid19Routes = require("./routes/covid19");

const { authorize } = require("./controllers/authentication");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/signUp", userRoutes);
app.use("/auth", authenticationRoutes);
app.use(authorize);
app.use("/admin", adminRoutes);
app.use("/covid19", covid19Routes);

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: "Route not found",
    },
  });
});

module.exports = app;
