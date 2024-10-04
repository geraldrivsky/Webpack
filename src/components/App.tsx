import avatarJpg from "@/assets/avatar.jpg";
import avatarPng from "@/assets/avatar.png";
import CoffeeSvg from "@/assets/coffee.svg";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "./App.module.scss";

function todo() {
  todo2();
}

function todo2() {
    throw new Error("Function not implemented.");
  }

function App() {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 200);

    setTimer(timer);

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  

  return (
    <div data-testid="tests-app-classname">
      <h1>PLATFORM={__PLATFORM__}</h1>
      <h1>BUILD={__BUILD__}</h1>
      <img src={avatarJpg} alt="avatar" width={90} height={90} />
      somebody is here!
      <CoffeeSvg
        style={{ color: "lightgreen", transform: "rotate(45deg)" }}
        width={50}
        height={50}
      />
      <img src={avatarPng} alt="avatar" width={90} height={90} />
      <p>{counter}</p>
      <button
        className={classNames.a}
        type="button"
        onClick={() => {
          setCounter(counter => counter + 20);
        }}>
        Counter!
      </button>
      <button
        className={classNames.a}
        type="button"
        onClick={() => {
          clearInterval(timer);
          todo()
        }}>
        Stop
      </button>
      <Outlet />
    </div>
  );
}

export default App;
