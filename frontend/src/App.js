import "./App.css";
import Card from "./components/Card";
import logo from "./assets/UI_design/logo/Counter_withBg.png";

function App() {
  const data = {
    title: "Welcome to Counter.js",
    body: "This page has been viewed",
    image: { l: logo, h: 200, w: 290 },
    counter: "5",
  };

  return (
    <div className="App">
      <Card
        title={data.title}
        body={data.body}
        image={data.image}
        counter={data.counter}
      />
    </div>
  );
}

export default App;