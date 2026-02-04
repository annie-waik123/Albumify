import "./App.css";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Row,
  Col,
  Card
} from "react-bootstrap";


const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);


 useEffect(() => {
  const authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  };

  fetch("https://accounts.spotify.com/api/token", authParams)
    .then((res) => res.json())
    .then((data) => {
      setAccessToken(data.access_token);
    })
    .catch((err) => console.error("Token error:", err));
}, []);


  async function search() {
  if (!searchInput || !accessToken) return;

  const artistParams = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
    artistParams
  );

  const data = await response.json();

  if (!data.artists || data.artists.items.length === 0) {
    console.log("No artist found");
    return;
  }

  const artistID = data.artists.items[0].id;
  console.log("Artist ID:", artistID);

  // Get Artist Albums
await fetch(
  "https://api.spotify.com/v1/artists/" +
    artistID +
    "/albums?include_groups=album&market=US&limit=50",
  artistParams
)
  .then((result) => result.json())
  .then((data) => {
    setAlbums(data.items);
  });

  
}


  return (
    
    <>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />

          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      <h1>Spotify Album Finder</h1>
      
      <Container>
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {albums.map((album) => (
  <Card
    key={album.id}
    style={{
      backgroundColor: "#fff",
      margin: "12px",
      borderRadius: "12px",
      width: "220px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease",
    }}
    className="album-card"
  >
    <Card.Img
      src={album.images[0]?.url}
      alt={album.name}
      style={{
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        height: "220px",
        objectFit: "cover",
      }}
    />

    <Card.Body style={{ textAlign: "center" }}>
      <Card.Title
        style={{
          fontWeight: "600",
          fontSize: "16px",
          marginTop: "10px",
          color: "#111",
          whiteSpace: "normal",
        }}
      >
        {album.name}
      </Card.Title>

      <Card.Text style={{ color: "#555", fontSize: "14px" }}>
        Released <br />
        {album.release_date}
      </Card.Text>

      <Button
        href={album.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#1DB954",
          border: "none",
          fontWeight: "600",
          borderRadius: "20px",
          padding: "6px 14px",
          fontSize: "14px",
        }}
      >
        Open in Spotify
      </Button>
    </Card.Body>
  </Card>
))}

      </Row>
    </Container>
    </>
    
    
    
  );
}

export default App;

 

