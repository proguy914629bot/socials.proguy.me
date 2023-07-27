const socials_url = 'https://socials-cdn.proguy.me/socials.json';
const socials = document.querySelector(".buttons");
const header = document.querySelector(".header");

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

async function getSocials() {
    let r = await fetch(socials_url);
    let data = await r.json();
    return data;
}

function initializeSocials(data) {
    let svgData;
    let iconElement, svgElement, pathElement;
    let buttonElement, contentElement;

    data.socials.forEach(element => {
        // svg/icon stuff
        svgData = element.svg;
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        svgElement.setAttribute('viewBox', element.svg.viewBox);
        svgData.path.forEach(svgPath => {
            pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', svgPath);
            svgElement.appendChild(pathElement);
        });
        iconElement = document.createElement('span');
        iconElement.classList.add('icon');
        iconElement.appendChild(svgElement);

        // button stuff
        buttonElement = document.createElement('button');
        buttonElement.addEventListener('click', () => {
            openInNewTab(element.url);
        });
        contentElement = document.createElement('span');
        contentElement.classList.add('content');
        contentElement.innerText = element.name;
        buttonElement.appendChild(iconElement);
        buttonElement.appendChild(contentElement);

        socials.appendChild(buttonElement);
    });
}

function modifyHeaders(data) {
    console.log(1);
    const hData = data.header;
    let pfp = header.querySelector(".pfp");
    let heading = header.querySelector(".heading");
    let email = header.querySelector(".details #email");

    pfp.src = hData.pfp;
    heading.innerText = hData.heading;
    email.href = `mailto:${hData.email}`;
    email.innerText = hData.email;

    document.title = hData.heading;
}

async function initialize() {
    let data = await getSocials();
    initializeSocials(data);
    modifyHeaders(data);
}

initialize();