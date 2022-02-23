import React from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [data, setData] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return <h1>Loading...</h1>
  else {
    const frameData = data.i_url ? data.i_url : data.v_url;

    return (
      <div className="App">
        <Card counter={data.counter} content={frameData} />
      </div>
    );
  }
}

export default App;