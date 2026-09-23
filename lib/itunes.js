// Adds album art and track details from Apple's public iTunes Lookup API.
// If the request fails (offline, rate limit), the app still runs with the chart data only.

async function enrichWithItunes(songs) {
  const ids = songs.map((s) => s.appleTrackId).join(",");
  const url = `https://itunes.apple.com/lookup?id=${ids}&country=us`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const byId = new Map(data.results.map((r) => [String(r.trackId), r]));

    let matched = 0;
    for (const s of songs) {
      const r = byId.get(s.appleTrackId);
      if (!r) continue;
      matched++;
      s.artworkUrl = r.artworkUrl100 ? r.artworkUrl100.replace("100x100bb", "600x600bb") : null;
      s.album = r.collectionName || null;
      s.genre = r.primaryGenreName || null;
      s.releaseDate = r.releaseDate ? r.releaseDate.slice(0, 10) : null;
      s.durationMs = r.trackTimeMillis || null;
      s.previewUrl = r.previewUrl || null;
      s.explicit = r.trackExplicitness === "explicit";
    }
    console.log(`iTunes lookup: details found for ${matched} of ${songs.length} songs`);
  } catch (err) {
    console.warn(`iTunes lookup failed (${err.message}); showing chart data only`);
  }
}

module.exports = { enrichWithItunes };
