const memeTitle = document.getElementById("meme-title");
const memeImage = document.getElementById("meme-image");
const memeAuthor = document.getElementById("meme-author");
const memeLink = document.getElementById("meme-link");
const likeButton = document.getElementById("like-meme");
const likeCount = document.getElementById("like-count");

// Load like count from localStorage
// const likeButton = document.getElementById("like-meme");
// const likeCount = document.getElementById("like-count");

// Get likes from localStorage or set it to 0 if it doesn't exist
let likes = localStorage.getItem("memeLikes") ? parseInt(localStorage.getItem("memeLikes")) : 0;

async function fetchMeme() {
    try {
        const response = await fetch("https://meme-api.com/gimme");
        const data = await response.json();

        memeImage.style.opacity = "0"; // Fade out
        setTimeout(() => {
            memeTitle.textContent = data.title;
            memeImage.src = data.url;
            memeAuthor.textContent = data.author;
            memeLink.href = data.postLink;
            memeLink.textContent = "View Original";
            memeImage.style.opacity = "1"; // Fade in
        }, 500);
    } catch (error) {
        console.error("Error fetching meme:", error);
        memeTitle.textContent = "Failed to load meme!";
    }
}


likeButton.addEventListener("click", () => {
    likes++;
    likeCount.textContent = likes;
    localStorage.setItem("memeLikes", likes);
});


document.getElementById("share-meme").addEventListener("click", () => {
    navigator.clipboard.writeText(memeLink.href);
    alert("Meme link copied to clipboard!");
});


document.getElementById("new-meme").addEventListener("click", fetchMeme);


fetchMeme();
