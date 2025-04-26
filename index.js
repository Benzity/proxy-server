const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const BACKEND = "http://43.202.120.161:8000";

app.use("/", async (req, res) => {
  const target = BACKEND + req.url;

  try {
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      }
    };

    // ✅ GET이나 HEAD에는 body가 없어야 함
    if (req.method !== "GET" && req.method !== "HEAD") {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(target, options);
    const data = await response.text();

    res.status(response.status).send(data);
  } catch (err) {
    console.error("프록시 오류:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy server running"));
