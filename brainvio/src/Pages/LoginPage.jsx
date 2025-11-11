import { useState } from "react";

function LoginPage() {
  return (
    <div className="container">
      <h1 className="login-header">Login</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
