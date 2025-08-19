const button = document.getElementById('yes');
const music = document.getElementById('background-music');
const newCenter = document.getElementById('new-center');
const typewriterDiv = document.getElementById('typewriter');

const imageFiles = [
    '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg' , '9.jpeg', '10.jpeg'
,'11.jpeg'];

function typeWriter(text, i = 0) {
    if (i < text.length) {
        typewriterDiv.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 50);
    }
}

function showRandomImage() {
    const img = document.createElement('img');
    img.src = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    img.className = 'random-image';
    img.style.position = 'fixed';
    img.style.zIndex = 100;
    
 
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isTinyMobile = window.innerWidth <= 360;
    
    if (isTinyMobile) {
        img.style.width = '110px';
        img.style.height = '140px';
    } else if (isSmallMobile) {
        img.style.width = '130px';
        img.style.height = '160px';
    } else if (isMobile) {
        img.style.width = '160px';
        img.style.height = '200px';
    } else {
        img.style.width = '240px';
        img.style.height = '300px';
    }
    
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';
    img.style.borderRadius = '20px';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.7s';

   
    const centerBox = document.getElementById('new-center').getBoundingClientRect();
    let left, top;
    let tries = 0;
    const imgWidth = parseInt(img.style.width);
    const imgHeight = parseInt(img.style.height);
    
    do {
        left = Math.random() * (window.innerWidth - imgWidth - 20);
        top = Math.random() * (window.innerHeight - imgHeight - 20);
        tries++;
        // Check if the image would overlap the center box
    } while (
        left + imgWidth > centerBox.left &&
        left < centerBox.right &&
        top + imgHeight > centerBox.top &&
        top < centerBox.bottom &&
        tries < 20
    );
    img.style.left = left + 'px';
    img.style.top = top + 'px';

    document.body.appendChild(img);
    setTimeout(() => { img.style.opacity = '1'; }, 50);
    setTimeout(() => {
        img.style.opacity = '0';
        setTimeout(() => img.remove(), 700);
    }, 2200);
}

// Heart popping effect
button.addEventListener('click', () => {
    // Start continuous heart popping
    if (window.heartInterval) return; // Prevent multiple intervals
    window.heartInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * (window.innerWidth - 40) + 'px';
                heart.style.top = Math.random() * (window.innerHeight - 40) + 'px';
                heart.style.position = 'fixed';
                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }, i * 100);
        }
    }, 600); // Hearts pop every 600ms
});

button.addEventListener('click', () => {
    document.getElementById('center').style.display = 'none';
    newCenter.style.display = 'flex';
    newCenter.style.animation = 'fadeInScale 1s';
    typewriterDiv.innerHTML = '';
    typeWriter('Wishing you a very happy birthday my dear sister pranju little angle 🫂🌸✨💖');
    music.currentTime = 167;
    music.play();
    // Start showing random images
    if (!window.randomImageInterval) {
        window.randomImageInterval = setInterval(showRandomImage, 1200);
    }
});