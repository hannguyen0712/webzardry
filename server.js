const path = require("path");
const express = require("express");
const { CHART, songs } = require("./data/songs");
const { enrichWithItunes } = require("./lib/itunes");
const { homePage, songPage, notFoundPage } = require("./views/templates");

const app = express();
const PORT = process.env.PORT || 3000;

// Static files: our stylesheet, plus Pico served straight from node_modules
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "node_modules/@picocss/pico/css")));

// Front page: list of all songs
app.get("/", (req, res) => {
  res.send(homePage(CHART, songs));
});

// Detail page for one song, e.g. /songs/purple-rain
app.get("/songs/:slug", (req, res, next) => {
  const song = songs.find((s) => s.slug === req.params.slug.toLowerCase());
  if (!song) return next(); // fall through to 404
  res.send(songPage(CHART, song));
});

// 404 for anything else
app.use((req, res) => {
  res.status(404).send(notFoundPage(req.path));
});

enrichWithItunes(songs).finally(() => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
