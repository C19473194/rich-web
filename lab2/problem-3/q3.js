document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username-input");
    const searchButton = document.getElementById("search-button");
    const avatar = document.getElementById("avatar");
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const location = document.getElementById("location");
    const gists = document.getElementById("gists");
    const repoList = document.getElementById("repo-list");

    searchButton.addEventListener("click", () => {
        const username = usernameInput.value;
        if (username) {
            fetchUserData(username);
        }
    });

    function fetchUserData(username) {
        // Make a GET request to the Github API to fetch user data
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => response.json())
            .then((data) => {
                avatar.src = data.avatar_url;
                name.textContent = data.name;
                username.textContent = `Username: ${data.login}`;
                email.textContent = `Email: ${data.email || "Not available"}`;
                location.textContent = `Location: ${data.location || "Not available"}`;
                gists.textContent = `Gists: ${data.public_gists}`;

                fetchUserRepos(data.repos_url);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }

 function fetchUserRepos(reposUrl) {
    const reposList = document.getElementById('repos');
    reposList.innerHTML = '';

    // Make a GET request to the user's repositories
    fetch(reposUrl)
        .then((response) => response.json())
        .then((reposData) => {
            if (reposData.length > 0) {
                for (const repo of reposData) {
                    const repoItem = document.createElement('li');
                    const repoLink = document.createElement('a');
                    repoLink.href = repo.html_url;
                    repoLink.target = '_blank';
                    repoLink.textContent = repo.name;

                    const description = document.createElement('p');
                    description.textContent = repo.description || 'No description available';

                    repoItem.appendChild(repoLink);
                    repoItem.appendChild(description);
                    reposList.appendChild(repoItem);
                }

                if (reposData.length > 5) {
                    reposList.style.overflowY = 'auto';
                    reposList.style.maxHeight = '250px'; 
                } else {
                    reposList.style.overflowY = 'visible'; // Display all items without scrolling
                }
            } else {
                reposList.innerHTML = '<li>No repositories found.</li>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

});
