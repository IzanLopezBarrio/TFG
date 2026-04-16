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
    await fetch("http://localhost:9999/results/group/" + email).then((response) => {
        if (response.status !== 200) {
            noTest.innerHTML = "No ha realizado ningún test. ¡Pongamonos manos a la obra!"
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        response.forEach(element => {
            labels.push(element.Idioma + " " + element.Nivel)
            data.push(element.Promedio)
        });
    })

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [{
            data: data,
            label: "Promedio de notas por idioma.",
            backgroundColor: [
                'rgba(255, 99, 132, 0.25)',
                'rgba(255, 159, 64, 0.25)',
                'rgba(255, 205, 86, 0.25)',
                'rgba(75, 192, 192, 0.25)',
                'rgba(54, 162, 235, 0.25)',
                'rgba(153, 102, 255, 0.25)',
                'rgba(201, 203, 207, 0.25)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
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