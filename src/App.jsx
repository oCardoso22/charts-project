import React, { useState, useEffect } from 'react';
import GoogleChart from './components/GoogleChart.jsx';

function App() {
    const [chartsLoaded, setChartsLoaded] = useState(false);

    useEffect(() => {
        if (window.google && window.google.visualization) {
            setChartsLoaded(true);
            return;
        }

        if (!document.getElementById('google-charts-script')) {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.id = 'google-charts-script';
            script.onload = () => {
                window.google.charts.load('current', { 'packages': ['corechart'] });
                window.google.charts.setOnLoadCallback(() => {
                    setChartsLoaded(true);
                });
            };
            document.head.appendChild(script);
        } else if (window.google && window.google.charts && !chartsLoaded) {
            window.google.charts.load('current', { 'packages': ['corechart'] });
            window.google.charts.setOnLoadCallback(() => setChartsLoaded(true));
        }
    }, []);

    const barData = [
        ['Mês', 'Vendas (Milhões)', { role: 'style' }],
        ['Jan', 8.9, '#3366cc'],
        ['Fev', 10.2, '#dc3912'],
        ['Mar', 9.5, '#ff9900'],
        ['Abr', 11.8, '#109618'],
        ['Mai', 12.1, '#990099']
    ];
    const barOptions = {
        title: 'Vendas Mensais (Mockadas)',
        legend: { position: 'none' },
        hAxis: { title: 'Vendas' },
        vAxis: { title: 'Mês' }
    };

    const lineData = [
        ['Dia', 'Acessos'], ['Seg', 1000], ['Ter', 1170], ['Qua', 660], ['Qui', 1030], ['Sex', 1500], ['Sáb', 800], ['Dom', 550]
    ];
    const lineOptions = {
        title: 'Tráfego do Site (Mockado)',
        curveType: 'function',
        legend: { position: 'bottom' },
        pointSize: 5
    };

    const pieData = [
        ['Categoria', 'Valor (R$)'], ['Aluguel', 3500], ['Alimentação', 1200], ['Transporte', 450], ['Lazer', 300], ['Outros', 550]
    ];
    const pieOptions = {
        title: 'Distribuição Mensal de Despesas (Mockadas)',
        is3D: true,
        pieHole: 0.0
    };

    if (!chartsLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Carregando bibliotecas gráficas...</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Dashboard (Simulação)</h1>
            <hr style={{ margin: '30px 0' }} />

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#555' }}>📊 Gráfico de Barras (Horizontal)</h2>
                <GoogleChart chartType="BarChart" data={barData} options={barOptions} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#555' }}>📈 Gráfico de Linha</h2>
                <GoogleChart chartType="LineChart" data={lineData} options={lineOptions} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#555' }}>🥧 Gráfico de Pizza 3D</h2>
                <GoogleChart chartType="PieChart" data={pieData} options={pieOptions} />
            </div>
        </div>
    );
}

export default App;