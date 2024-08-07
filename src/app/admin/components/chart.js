"use client"

import React, { useEffect } from 'react';

export default function ChartComponent() {
    useEffect(() => {
        // Load the Google Charts library
        const loadGoogleCharts = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    google.charts.load('current', { packages: ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);
                };
                document.body.appendChild(script);
            } else {
                google.charts.load('current', { packages: ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            const data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004', 1000, 400],
                ['2005', 1170, 460],
                ['2006', 660, 1120],
                ['2007', 1030, 540],
            ]);

            const options = {
                title: 'Company Performance',
                curveType: 'function',
                legend: { position: 'bottom' },
            };

            const chart = new google.visualization.LineChart(
                document.getElementById('curve_chart')
            );

            chart.draw(data, options);
        };

        loadGoogleCharts();
    }, []);

    return (
        <>
            <div id="curve_chart" style={{ width: 100 + "%", height: 300 + "px" }}></div>
        </>
    );
};