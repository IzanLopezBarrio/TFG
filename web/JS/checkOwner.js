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
  return undefined;
}

checkDaCookie()

async function checkDaCookie() {
    const email = getCookie("email")
    const data = {
        email: email
    }
    await fetch("http://localhost:9999/users/owner/check", {method: 'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)}).then((response) => {
        if (response.status === 200) {
            window.location.replace("owner/index.html")
        }
    })
}