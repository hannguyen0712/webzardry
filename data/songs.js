// Top 10 of the Shazam "Top 50 Phoenix, United States" chart,
// captured 2026-09-22 from https://www.shazam.com/charts/top-50/united-states/phoenix
// Every field below was copied from that page. Nothing is invented.
// Extra fields (album art, album, genre, release date, length, preview)
// are looked up from Apple's iTunes API when the server starts (see lib/itunes.js).

const CHART = {
  name: "Shazam Top 50: Phoenix, United States",
  sourceUrl: "https://www.shazam.com/charts/top-50/united-states/phoenix",
  capturedOn: "2026-09-22",
};

const songs = [
  { rank: 1, slug: "joseph", title: "Joseph", artist: "Falling In Reverse, Corey Taylor & Serj Tankian", appleTrackId: "6797421554", appleAlbumId: "6797421553", shazamUrl: "https://www.shazam.com/song/6797421554/joseph" },
  { rank: 2, slug: "nicole-kidman", title: "Nicole Kidman", artist: "ADÉLA", appleTrackId: "6792884088", appleAlbumId: "6792883860", shazamUrl: "https://www.shazam.com/song/6792884088/nicole-kidman" },
  { rank: 3, slug: "choosin-texas", title: "Choosin' Texas", artist: "Ella Langley", appleTrackId: "1869436839", appleAlbumId: "1869436835", shazamUrl: "https://www.shazam.com/song/1869436839/choosin-texas" },
  { rank: 4, slug: "purple-rain", title: "Purple Rain", artist: "Prince & The Revolution", appleTrackId: "1746833484", appleAlbumId: "1746833068", shazamUrl: "https://www.shazam.com/song/1746833484/purple-rain" },
  { rank: 5, slug: "sweet-forever", title: "Sweet Forever", artist: "Mondo Cozmo", appleTrackId: "6805129295", appleAlbumId: "6805129290", shazamUrl: "https://www.shazam.com/song/6805129295/sweet-forever" },
  { rank: 6, slug: "loser", title: "Loser", artist: "Tame Impala", appleTrackId: "1836226731", appleAlbumId: "1836226516", shazamUrl: "https://www.shazam.com/song/1836226731/loser" },
  { rank: 7, slug: "vibin", title: "Vibin", artist: "Wxoda", appleTrackId: "6812803286", appleAlbumId: "6812803282", shazamUrl: "https://www.shazam.com/song/6812803286/vibin" },
  { rank: 8, slug: "cold-shoulder", title: "Cold Shoulder", artist: "Shifter!", appleTrackId: "6813451875", appleAlbumId: "6813451874", shazamUrl: "https://www.shazam.com/song/6813451875/cold-shoulder" },
  { rank: 9, slug: "stupid-song", title: "stupid song", artist: "Olivia Rodrigo", appleTrackId: "1889992115", appleAlbumId: "1889992111", shazamUrl: "https://www.shazam.com/song/1889992115/stupid-song" },
  { rank: 10, slug: "boston", title: "Boston", artist: "STELLA LEFTY", appleTrackId: "6783994964", appleAlbumId: "6783994651", shazamUrl: "https://www.shazam.com/song/6783994964/boston" },
];

// Apple Music link built from the album and track IDs listed on the Shazam page
for (const s of songs) {
  s.appleMusicUrl = `https://music.apple.com/us/album/${s.slug}/${s.appleAlbumId}?i=${s.appleTrackId}`;
}

module.exports = { CHART, songs };
