import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setName(userData.name);
    setAccount(userData.account);
    setEmail(userData.email);
    setPassword(userData.password); 
  }, [navigate]);

  async function handleUpdate(e) {
    e.preventDefault();
    if (!name || !account || !email || !password) {
      alert("所有欄位都必須填寫！");
      return;
    }
  
    console.log("🔄 嘗試更新使用者資料...");
  
    const { data, error } = await supabase
      .rpc("update_user_profile", {
        id_param: user.id,
        name_param: name,
        account_param: account,
        email_param: email,
        password_param: password,
      });
  
    console.log("🔍 更新結果:", data, error);
  
    if (error) {
      alert("更新失敗：" + error.message);
    } else {
      alert("資料更新成功！");
      // 這裡 **不清除密碼**
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name, account, email, password })
      );
      setUser({ ...user, name, account, email, password }); // 更新狀態
    }
  }
  

  async function handleDeleteAccount() {
    if (!window.confirm("確定要刪除帳號嗎？此操作無法復原！")) return;
  
    console.log("🔄 嘗試刪除帳號...");
  
    // 使用 RPC 來刪除帳號
    const { error } = await supabase.rpc("delete_user", { id_param: user.id });
  
    console.log("🔍 刪除結果:", error);
  
    if (error) {
      alert("刪除失敗：" + error.message);
    } else {
      alert("帳號已刪除！");
      localStorage.removeItem("user");
      navigate("/register");
    }
  }
  
  

  function handleLogout() {
    localStorage.removeItem("user");
    alert("已登出！");
    navigate("/login");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center">會員中心</h2>
            {user ? (
              <>
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label">名稱</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">帳號</label>
                    <input type="text" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">密碼</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">更新資料</button>
                </form>

                <hr />
                <button className="btn btn-danger w-100 mt-3" onClick={handleDeleteAccount}>刪除帳號</button>
                <button className="btn btn-secondary w-100 mt-2" onClick={handleLogout}>登出</button>
              </>
            ) : (
              <p className="text-center">載入中...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
