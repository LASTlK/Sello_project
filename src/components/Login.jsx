import { useState } from "react"
import SelloLogo from "../assets/images/sello-logo.svg"
import LoginBg from "../assets/images/login-bg.jpg"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email, "Password:", password)
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-none d-md-block">
          <div
            className="h-100 w-100"
            style={{
              backgroundImage: `url(${LoginBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div className="col-md-6 col-12">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="w-75" style={{ maxWidth: "400px" }}>
              <div className="text-center mb-4">
                <img
                  src={SelloLogo}
                  alt="Sello Logo"
                  className="mb-3"
                  style={{ height: "50px" }}
                />
                <h4 className="mt-3">ВОЙТИ В АККАУНТ</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email*"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль*"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fw-semibold mb-3 btn-login"
                >
                  ВОЙТИ
                </button>
              </form>

              <div className="text-center">
                <span className="register-text">
                  <a href="/register" className="register-link">
                    Зарегистрировать
                  </a>{" "}
                  новый аккаунт
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
