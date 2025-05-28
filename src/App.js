import React, { useEffect, useState } from "react";

const BACKEND_URL = "https://1ec78dbc-b32c-4e69-8e8a-533fa3b28859-00-2dhuuwm0ppf6u.picard.replit.dev";

function App() {
  const [sounds, setSounds] = useState([]);
  const [soundFile, setSoundFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/sounds`)
      .then(r => r.json())
      .then(setSounds);
  }, []);

  const onFileChange = e => setSoundFile(e.target.files[0]);

  const uploadSound = async (e) => {
    e.preventDefault();
    if (!soundFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("sound", soundFile);
    await fetch(`${BACKEND_URL}/api/upload`, { method: "POST", body: formData });
    setUploading(false);
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 32 }}>
      <h1>Soundshare</h1>
      <form onSubmit={uploadSound}>
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <button type="submit" disabled={uploading}>Upload</button>
      </form>
      <h2>Shared Sounds</h2>
      <ul>
        {sounds.map(s => (
          <li key={s.filename}>
            <audio controls src={`${BACKEND_URL}${s.url}`}></audio>
            <div>{s.filename}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
