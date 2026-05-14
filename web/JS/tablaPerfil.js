const ctx = document.getElementById('myChart');
const noTest = document.getElementById("noTest")
const intro = document.getElementById("introTXT")

const name = getCookie("UserName")
const email = getCookie("email")

createChart()

async function createChart() {
    intro.innerHTML = intro.innerHTML + name
    const data = []
    const labels = []
    let delayed
    await fetch("http://localhost:9999/results/group/" + email).then((response) => {
        if (response.status !== 200) {
            noTest.innerHTML = "No se ha dado de alta en ningún idioma. ¡Pongamonos manos a la obra!"
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        response.forEach(element => {
            labels.push(element.Idioma + " " + element.Nivel + " " + element.Categoria)
            data.push(element.Promedio)
        });
    })

    function colorize() {
        return (ctx) => {
            const v = ctx.parsed.x;
            const c = v < 5 ? '#ff0000'
            : v == 5 ? '#ffff00'
            : '#00ff00';

            return c;
        };
    }

    function colorizeTrans() {
        return (ctx) => {
            const v = ctx.parsed.x;
            const c = v < 5 ? 'rgba(255, 0, 0, 0.25)'
            : v == 5 ? 'rgba(255, 255, 0, 0.25)'
            : 'rgba(0, 255, 0, 0.25)';

            return c;
        };
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [{
            data: data,
            label: "Media",
            backgroundColor: colorizeTrans(),
            borderColor: colorize(),
            borderWidth: 3
        }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value, context) {
                        return value.toFixed(2);
                    },
                    font: {
                        weight: 'bold',
                        size: 32
                    },
                    display: function(context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        if (value > 0) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            }
        },
        plugins: [ChartDataLabels]
    });
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}