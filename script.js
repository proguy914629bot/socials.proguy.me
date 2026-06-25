const socials_url = 'https://socials-cdn.proguy.me/socials.json';
const socials = document.querySelector(".buttons");
const header = document.querySelector(".header");

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

async function getSocials() {
    let r = await fetch(socials_url);
    return await r.json();
}

// "GitHub (@proguy914629bot)" -> { platform: "GitHub", handle: "@proguy914629bot" }
function splitName(name) {
    const match = name.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
    if (match) {
        return { platform: match[1].trim(), handle: match[2].trim() };
    }
    return { platform: name.trim(), handle: '' };
}

function initializeSocials(data) {
    let svgData;
    let iconElement, svgElement, pathElement;
    let buttonElement, contentElement;

    data.socials.forEach((element, index) => {
        // svg/icon stuff (the logo on the right)
        svgData = element.svg;
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('viewBox', element.svg.viewBox);
        svgData.path.forEach(svgPath => {
            pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', svgPath);
            svgElement.appendChild(pathElement);
        });
        iconElement = document.createElement('span');
        iconElement.classList.add('icon');
        iconElement.appendChild(svgElement);

        // text: platform name + handle
        const { platform, handle } = splitName(element.name);
        contentElement = document.createElement('span');
        contentElement.classList.add('content');

        const platformElement = document.createElement('span');
        platformElement.classList.add('platform');
        platformElement.innerText = platform;
        contentElement.appendChild(platformElement);

        if (handle) {
            const handleElement = document.createElement('span');
            handleElement.classList.add('handle');
            handleElement.innerText = handle;
            contentElement.appendChild(handleElement);
        }

        // row/button
        buttonElement = document.createElement('button');
        buttonElement.setAttribute('aria-label', element.name);
        buttonElement.style.setProperty('--i', index);
        buttonElement.addEventListener('click', () => {
            openInNewTab(element.url);
        });
        buttonElement.appendChild(contentElement);
        buttonElement.appendChild(iconElement);

        socials.appendChild(buttonElement);
    });
}

function modifyHeaders(data) {
    const hData = data.header;
    let pfp = document.querySelector(".profile .pfp");
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
