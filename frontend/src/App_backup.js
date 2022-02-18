import React from "react";
// import logo from "./logo.svg";
import logo from "./Counter_withBg.png";
// import "./App.css";

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome User</h1>
        <p>
          This page has been viewed
          <h1>{!data ? "Loading..." : data.counter}</h1>
          <h1>{!data ? "Loading..." : data.image.url}</h1>
          times.
        </p>
      </header>
    </div>
  );
}

export default App;