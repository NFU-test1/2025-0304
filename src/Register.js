import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("users").insert([
      { name, email, account, password }
    ]);

    if (error) {
      alert("註冊失敗：" + error.message);
    } else {
      alert("註冊成功！");
      navigate("/login"); // 註冊成功後跳轉到登入頁面
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">註冊</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">名稱</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">帳號</label>
                <input type="text" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">密碼</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">註冊</button>
            </form>
            <p className="text-center mt-3">
              已有帳號？ <a href="/login">點此登入</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
