import "./css/index.css";
let urlBox = <HTMLInputElement>document.getElementById("urlBox");
let shortUrlButton = document.getElementById("shortUrlButton");
let convertedUrls = document.getElementById("convertedUrls");
shortUrlButton.addEventListener("click", async () => {
    const url = "/Home/MakeLink"
    let linkToShort = JSON.stringify(urlBox.value);
    console.log(linkToShort);
    await fetch(url, {
        method: 'POST',
        body: linkToShort,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        if (response.status == 400)
            convertedUrls.innerText += "Link is wrong\n";
        else
            return response.text()
    })
        .then((res) => {
            if (res)
                convertedUrls.innerText += `Your new url is: ${res}\n`;
        }).catch((error) => {
            console.log(error)
        })


}); 