import "./css/index.css";
import * as qr from "qrcode";
let urlBox = <HTMLInputElement>document.getElementById("urlBox");
let shortUrlButton = document.getElementById("shortUrlButton");
let convertedUrls = document.getElementById("convertedUrls");
shortUrlButton.addEventListener("click", async () => {
    const url = "/Home/MakeLink"
    let link = urlBox.value;
    let linkToShort = JSON.stringify(link);
    console.log(linkToShort);
    await fetch(url, {
        method: 'POST',
        body: linkToShort,
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.status == 400)
            convertedUrls.innerText += "Link is wrong\n";
        else
            return response.text()
    })
    .then((res) => {
        if (res) {
            let newUrlContainer = document.createElement("div");
            let urlElemContainer = document.createElement("div");
            let shortUrlElemContainer = document.createElement("div");
            let urlElem = document.createElement("a");
            urlElem.href = link;
            urlElem.innerText = link;

            let shortUrlElem = document.createElement("a");
            shortUrlElem.href = res;
            shortUrlElem.innerText = res;

            let urlCanvas = document.createElement("canvas");
            qr.toCanvas(urlCanvas, res, function (error) {
                if (error) console.error(error)
            })
            urlCanvas.style.width = "100%";
            urlCanvas.style.height = "100%";

            //appending url, short url and short url's qrcode
            urlElemContainer.appendChild(urlElem);
            shortUrlElemContainer.appendChild(shortUrlElem);
            newUrlContainer.appendChild(urlElemContainer);
            newUrlContainer.appendChild(shortUrlElemContainer);
            newUrlContainer.appendChild(urlCanvas);
            newUrlContainer.classList.add("urlContainer");
            convertedUrls.appendChild(newUrlContainer);
        }

    }).catch((error) => {
        console.log(error)
    })


}); 