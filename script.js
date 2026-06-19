async function searchUser() {

    const username = document.getElementById("username").value;   

    const profileDiv = document.getElementById("profile");
    const reposDiv = document.getElementById("repos");

    profileDiv.innerHTML = "Loading...";
    reposDiv.innerHTML = "";

    try {

        const userResponse =
            await fetch(`https://api.github.com/users/${username}`);

        const userData = await userResponse.json();

        if (userData.message === "Not Found") {
            profileDiv.innerHTML = "User not found";
            return;
        }

        profileDiv.innerHTML = `
            <img src="${userData.avatar_url}">
            <h2>${userData.name || "No Name"}</h2>
            <p>Followers: ${userData.followers}</p>
            <p>Following: ${userData.following}</p>
            <p>Public Repos: ${userData.public_repos}</p>
        `;
        

        const repoResponse =
            await fetch(`https://api.github.com/users/${username}/repos`);

        const repoData = await repoResponse.json();

        let repoHTML = "<h2>Repositories</h2>";

        repoData.forEach(repo => {
            repoHTML += `
                <div class="repo-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.language || "Not Specified"}</p>
                </div>
            `;
        });

        reposDiv.innerHTML = repoHTML;

    } catch (error) {
        profileDiv.innerHTML = "Something went wrong";
    }
}

