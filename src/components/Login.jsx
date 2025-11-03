import { useState } from "react"
import SelloLogo from "../assets/images/sello-logo.svg"
import LoginBg from "../assets/images/login-bg.jpg"
import XIcon from "../assets/icon/x-icon.svg"
import EyeOpenIcon from "../assets/icon/eye-open-icon.svg"
import EyeCloseIcon from "../assets/icon/eye-close-icon.svg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const clearEmail = () => setEmail("");
  const clearPassword = () => setPassword("");

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
              {/* Изображение */}
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
                {/* Email */}
                <div className="mb-3 position-relative">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email*"
                    required
                  />
                  {email && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={clearEmail}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={XIcon}
                        alt="Clear"
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                  )}
                </div>
                {/* Пароль */}
                <div className="mb-4 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль*"
                    required
                  />
                  <div className="position-absolute end-0 top-50 translate-middle-y me-2 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                        alt={showPassword ? "Hide" : "Show"}
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                    {password && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={clearPassword}
                        style={{ width: "24px", height: "24px", padding: "0" }}
                      >
                        <img
                          src={XIcon}
                          alt="Clear"
                          width="20"
                          height="20"
                          style={{ filter: "grayscale(80%) opacity(0.7)" }}
                        />
                      </button>
                    )}
                  </div>
                </div>
                {/* Кнопка входа */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fw-semibold mb-3 btn-login"
                >
                  ВОЙТИ
                </button>
              </form>
              {/* Ссылка на регистрацию */}
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
