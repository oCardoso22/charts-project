import React, { useEffect, useRef } from 'react';

const GoogleChart = ({ chartType, data, options }) => {
    const chartDivRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!data || !chartDivRef.current || !window.google || !window.google.visualization) {
            return;
        }

        const dataTable = window.google.visualization.arrayToDataTable(data);

        if (chartInstanceRef.current) {
            chartInstanceRef.current.clearChart();
        }

        const ChartConstructor = window.google.visualization[chartType];

        if (ChartConstructor) {
            const chart = new ChartConstructor(chartDivRef.current);
            chartInstanceRef.current = chart;
            chart.draw(dataTable, options);
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.clearChart();
            }
        };

    }, [chartType, data, options]);

    return (
        <div
            ref={chartDivRef}
            style={{ width: '100%', height: '400px', border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}
        />
    );
};

export default GoogleChart;