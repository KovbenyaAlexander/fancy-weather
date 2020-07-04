async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
}

getLinkToImage();

