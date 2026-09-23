const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fmtDuration = (ms) => {
  if (!ms) return null;
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

function layout(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <link rel="stylesheet" href="/css/pico.min.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header class="container">
    <nav>
      <ul><li><a href="/"><strong>Phoenix Top 10</strong></a></li></ul>
      <ul><li><small>What the Valley is Shazaming</small></li></ul>
    </nav>
  </header>
  <main class="container">${body}</main>
  <footer class="container"><small>Top 10 city chart for Phoenix based upon Shazam ranking. Graphics from Apple iTunes.</small></footer>
</body>
</html>`;
}

function cover(song, cls) {
  return song.artworkUrl
    ? `<img class="${cls}" src="${esc(song.artworkUrl)}" alt="Album artwork for ${esc(song.title)} by ${esc(song.artist)}">`
    : `<div class="${cls} no-art" aria-label="No artwork available">#${song.rank}</div>`;
}

function homePage(chart, songs) {
  const cards = songs
    .map(
      (s) => `
    <a class="song-card" href="/songs/${esc(s.slug)}">
      <article>
        ${cover(s, "thumb")}
        <div>
          <span class="rank">#${s.rank}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.artist)}</p>
          ${s.genre ? `<small>${esc(s.genre)}</small>` : ""}
        </div>
      </article>
    </a>`
    )
    .join("");

  return layout(
    "Phoenix Top 10 Songs",
    `<hgroup>
      <h1>Top 10 Songs in Phoenix</h1>
      <p>From the <a href="${esc(chart.sourceUrl)}" target="_blank" rel="noopener">${esc(chart.name)}</a>, captured ${esc(chart.capturedOn)}.</p>
    </hgroup>
    <section class="song-grid">${cards}</section>`
  );
}

function songPage(chart, s) {
  const row = (label, value) =>
    `<tr><th scope="row">${label}</th><td>${value ?? "<em>Not available</em>"}</td></tr>`;
  const link = (url) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`;

  return layout(
    `${s.title} by ${s.artist}`,
    `<nav aria-label="breadcrumb"><ul><li><a href="/">Top 10</a></li><li>#${s.rank}</li></ul></nav>
    <article class="detail">
      ${cover(s, "cover")}
      <div>
        <hgroup>
          <h1>${esc(s.title)}</h1>
          <p>${esc(s.artist)}</p>
        </hgroup>
        ${s.previewUrl ? `<audio controls src="${esc(s.previewUrl)}"></audio>` : ""}
        <table>
          <tbody>
            ${row("Chart rank", `#${s.rank} in Phoenix`)}
            ${row("Title", esc(s.title))}
            ${row("Artist", esc(s.artist))}
            ${row("Album", s.album && esc(s.album))}
            ${row("Genre", s.genre && esc(s.genre))}
            ${row("Release date", s.releaseDate && esc(s.releaseDate))}
            ${row("Length", fmtDuration(s.durationMs))}
            ${row("Explicit", s.explicit === undefined ? null : s.explicit ? "Yes" : "No")}
            ${row("Slug", esc(s.slug))}
            ${row("Apple track ID", esc(s.appleTrackId))}
            ${row("Apple album ID", esc(s.appleAlbumId))}
            ${row("Shazam", link(s.shazamUrl))}
            ${row("Apple Music", link(s.appleMusicUrl))}
            ${row("Chart", `${esc(chart.name)}, captured ${esc(chart.capturedOn)}`)}
          </tbody>
        </table>
      </div>
    </article>`
  );
}

function notFoundPage(path) {
  return layout(
    "404: Not Found",
    `<article class="not-found">
      <h1>404</h1>
      <p>Nothing is playing at <code>${esc(path)}</code>.</p>
      <a href="/" role="button">Back to the Top 10</a>
    </article>`
  );
}

module.exports = { homePage, songPage, notFoundPage };
