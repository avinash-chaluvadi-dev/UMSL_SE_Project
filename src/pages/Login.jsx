import React, { useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import "../styles/Form.css";

function LoginForm() {
  const pathRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  let current = null;

  const handleFocus = (offset, dasharray) => {
    if (current) current.pause();
    current = anime({
      targets: pathRef.current,
      strokeDashoffset: {
        value: offset,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: dasharray,
        duration: 700,
        easing: "easeOutQuart",
      },
    });
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <h1 className="login">LOGIN</h1>
          <p className="eula">Hello Admin :)</p>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
              >
                <stop
                  style={{ stopColor: "#F4B047" }}
                  offset="0"
                  id="stop876"
                />
                <stop
                  style={{ stopColor: "#F4B047" }}
                  offset="1"
                  id="stop878"
                />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
            />
          </svg>
          <form className="form" onSubmit={handleSumbit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              onFocus={() => handleFocus(0, "240 1386")}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              onFocus={() => handleFocus(-336, "240 1386")}
            />
            <input
              id="submit"
              type="submit"
              value="Login"
              onFocus={() => handleFocus(-730, "530 1386")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
