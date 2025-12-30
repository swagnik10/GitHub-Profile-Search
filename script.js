const url = "https://api.github.com/users/";
let userInput = document.getElementById("username");
let searchbtn = document.getElementById("search_btn");
let profileContainer = document.getElementById("profile_container");
let loadingContainer = document.getElementById("loading");


const generateProfile = (profile) =>{
    return (
        `<div class="profile_box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" 
                        alt="profile pic">
                    </div>
                    <div class="self">
                        <h2>${profile.name}</h2>
                        <h2>@${profile.login}</h2>
                    </div>
                </div>
                <div>
                   <a href="${profile.html_url}">
                         <button type="button" id = "check_btn" class = "profile_button">
                         Check Profile</button>
                   </a>
                </div>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status_item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status_item">
                    <h3>Followings</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status_item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>`
    );
}


const fetchProfile = async () => {
    let userName = userInput.value;
    loadingContainer.innerHTML = "Loading.....";
    loadingContainer.style.color = "black";
    try{
        const res = await fetch(`${url}${userName}`);
        const data = await res.json();
        //console.log(data);
        if(data.bio)
        {
            loadingContainer.innerText = "";
            profileContainer.innerHTML = generateProfile(data);
        }
        else{
            loadingContainer.innerHTML = data.message;
            loadingContainer.style.color = "red";
            profileContainer.innerText = "";
        }

    }
    catch(error)
    {
        console.log({error});
         loadingContainer.innerText = "";
    }
}

searchbtn.addEventListener("click", fetchProfile);