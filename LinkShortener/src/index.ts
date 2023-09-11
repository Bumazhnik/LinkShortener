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
            if (res) {
                let newUrlContainer = document.createElement("div");
                let shortUrlElem = document.createElement("a");
                shortUrlElem.href = res;
                shortUrlElem.innerText = res;
                newUrlContainer.appendChild(shortUrlElem);
                newUrlContainer.classList.add("urlContainer");
                convertedUrls.appendChild(newUrlContainer);
            }

        }).catch((error) => {
            console.log(error)
        })


}); 