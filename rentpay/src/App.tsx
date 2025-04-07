import React from 'react';
import FeeDisplay from './components/FeeDisplay';
import AllResidents from './components/AllResidents';
import './index.css'; // 确保这里是index.css

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>房屋缴费系统</h1>
            </header>
            <main className="main-content">
                <section className="fee-section">
                    <FeeDisplay />
                </section>
                <section className="residents-section">
                    <h2 className="section-title">所有住户缴费状态</h2>
                    <AllResidents />
                </section>
            </main>
        </div>
    );
}

export default App;