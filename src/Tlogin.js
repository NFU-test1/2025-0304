import React, { useState } from 'react';

const Tlogin = () => {
    // 使用 useState 存儲 users
    const [users, setUsers] = useState([
        {
            "email": "user1@example.com",
            "password": "password123",
            "name": "User One"
        },
        {
            "email": "user2@example.com",
            "password": "password456",
            "name": "User Two"
        }
    ]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    // 處理登入
    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setLoggedInUser(user);
            setName(user.name);
            alert('登入成功');
        } else {
            alert('登入失敗，請檢查您的電子郵件和密碼');
        }
    };

    // 處理更新帳號資訊
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!loggedInUser) return;

        const updatedUsers = users.map(user =>
            user.email === loggedInUser.email ? { email, password, name } : user
        );
        setUsers(updatedUsers);
        setLoggedInUser({ email, password, name });
        alert('更新成功');
    };

    // 處理刪除帳號
    const handleDelete = () => {
        if (!loggedInUser) return;

        const updatedUsers = users.filter(user => user.email !== loggedInUser.email);
        setUsers(updatedUsers);
        setLoggedInUser(null);
        setEmail('');
        setPassword('');
        setName('');
        alert('刪除成功');
    };

    // 處理登出
    const handleLogout = () => {
        setLoggedInUser(null);
        setEmail('');
        setPassword('');
        setName('');
        alert('已登出');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>使用者列表</h2>
            {/* 顯示目前所有使用者 */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Password</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} style={{ textAlign: 'center' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.password}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>登入</h2>
            {!loggedInUser ? (
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        Login
                    </button>
                </form>
            ) : (
                <div>
                    <h3>修改或刪除帳戶</h3>
                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                                required
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '10px' }}>
                            Update
                        </button>
                    </form>
                    <button onClick={handleDelete} style={{ width: '100%', padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '10px' }}>
                        Delete
                    </button>
                    <button onClick={handleLogout} style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tlogin;
