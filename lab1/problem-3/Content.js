//array of images
let catsImages = [
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://e3.365dm.com/21/03/768x432/skynews-cats-missing-microchip_5315182.jpg?20210323142004",
    "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc3836660-7846-11eb-80c3-8cc375faed89.jpg?crop=5729%2C3222%2C187%2C805&resize=1200",
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/petting_pet_cat-1296x728-header.jpg?w=1155&h=1528",
	"https://lh3.googleusercontent.com/pw/AL9nZEXYJlrVkYoKIkpx07_3F4HOiTiOheaoaiRAcwrUg3C613-jkzEubJ3k8Z9fDjG5IfVqCzorphZ00vp6mIyB79GtCsoyV69xXe9cqrA0zglgrcvYhH2UP4cDR88WTm1AmuyCxQHAWCB5JzKD7eD94dtNZA=w690-h920-no"
];

// Function to get a random cat image URL
function getRandomCatImage() {
    const randomIndex = Math.floor(Math.random() * catsImages.length);
    return catsImages[randomIndex];
}
// Cat facts to be displayed
const catFacts = [
    "Cats can rotate their ears 180 degrees.",
    "A cat's noseprint is unique, much like a human's fingerprint.",
    "Cats have whiskers on the backs of their front legs as well as on their faces.",
    "A group of cats is called a clowder.",
    "Cats sleep for an average of 13-16 hours a day."
];

// Function to display a random cat fact in a modal
function displayRandomCatFact() {
    const randomFactIndex = Math.floor(Math.random() * catFacts.length);
    alert(catFacts[randomFactIndex]);
}
	// Replace images and add hover effect
const imgs = document.getElementsByTagName("img");
for (let i = 0; i < imgs.length; i++) {
	imgs[i].src = getRandomCatImage();


    imgs[i].addEventListener('mouseover', () => {
        imgs[i].style.transition = 'transform 0.5s ease';
        imgs[i].style.transform = 'rotate(360deg) scale(1.2)';
    });

    imgs[i].addEventListener('mouseout', () => {
        imgs[i].style.transition = 'transform 0.5s ease';
        imgs[i].style.transform = 'rotate(0deg) scale(1)';
    });
	  // Add click event to display a random cat fact
    imgs[i].addEventListener('click', displayRandomCatFact);
}

//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Cats are awesome.";
}
//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "This website is now about cats.";

    p[i].addEventListener('mouseover', () => {
        p[i].style.color = 'purple';
    });

    p[i].addEventListener('mouseout', () => {
        p[i].style.color = 'black';
    });
}
function generateCatIpsum() {
    // Cat-themed placeholder text
    const catIpsum = "Meow meow meow purr, meow purr meow meow meow, purr meow purr meow.";
    return catIpsum;
}

const paragraphs = document.querySelectorAll('p');
paragraphs.forEach(p => {
    p.innerText = generateCatIpsum();
});











