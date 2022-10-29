const url = "https://raw.githubusercontent.com/proguy914629bot/socials.proguy.me/main/index.html"
const options = {
    headers: {
        "content-type": "text/html;charset=UTF-8",
    },
    status: 200,
}

async function fetchURL(url) {
    const response = await fetch(url);
    return await response.text();
}

async function handleRequest(request) {
    const html = await fetchURL(url);
    return new Response(html, options);
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest());
});