import { useState } from "react";
import supabase from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // 查詢 users 表格，確認帳號是否存在
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("account", account)
      .single();

    if (error || !data) {
      alert("登入失敗，帳號不存在");
      return;
    }

    // 確認密碼是否正確（此處密碼未加密，未來可加上 bcrypt）
    if (data.password !== password) {
      alert("登入失敗，密碼錯誤");
      return;
    }

    // 存儲使用者資訊到 localStorage
    localStorage.setItem("user", JSON.stringify(data));

    alert("登入成功！");
    navigate("/dashboard"); // 跳轉到會員中心
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">登入</h2>
          <form onSubmit={handleLogin} className="p-4 border rounded shadow">
            <div className="mb-3">
              <label className="form-label">帳號</label>
              <input
                type="text"
                className="form-control"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">密碼</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">登入</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
