const options: any = {
    animation: { duration: 0 },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    hover: {
        mode: "nearest",
        intersect: true
    },
    scales: {
        y: {
          display: true,
          title: {
            display: true
          }
        },
        x: {
          display: true,
          offset: false,
          type: 'time',
          ticks: {
            maxRotation: 0,
            minRotation: 0
          },
          time: {
            unit: "minute",
            displayFormats: {
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "HH:ss",
              day: "MMM D hh:mm",
              month: "MMM YYYY",
            },
            tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ",
          }
        }
    },
    plugins:{
      legend: {
        display: true
      }
    }
}

export {
    options
}
