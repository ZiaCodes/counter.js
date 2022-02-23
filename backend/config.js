var config = {};

config.HOST = "localhost"
config.PORT = process.env.PORT || 3001;

config.SECRET_KEY = "H6rT-V?pKE5=*8mp";

config.playlists = [
    { id: "PL55713C70BA91BD6E", total: 200 },
    { id: "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI", total: 201 }
]

config.GIF_API_ENDPOINT = "https://g.tenor.com/v1/random?key=LIVDSRZULELA&media_filter=minimal"

module.exports = config;