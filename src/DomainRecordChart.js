import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DomainRecordChart({ domains }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current && domains.length > 0) {
      const ctx = chartContainerRef.current.getContext('2d');

      
      const domainNames = domains.map(domain => domain.name);
      const recordCounts = domains.map(domain => domain.records.length);

      if (!chartInstance.current) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: domainNames,
            datasets: [{
              label: 'Record Count',
              data: recordCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        
        chartInstance.current.data.labels = domainNames;
        chartInstance.current.data.datasets[0].data = recordCounts;
        chartInstance.current.update();
      }
    }
  }, [domains]);

  return (
    <div>
      <h2>Domain Record Chart</h2>
      <canvas ref={chartContainerRef}></canvas>
    </div>
  );
}

export default DomainRecordChart;
