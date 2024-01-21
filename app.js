const username = 'PremChauhan1';
let currentPage=1;
let reposit=document.getElementById("repos");
let pagination = document.getElementById('pagination');
fetch(`https://api.github.com/users/${username}`)
.then(response=>response.json())
.then((data)=>{
    document.querySelector("#profile-img").src=data.avatar_url
    document.querySelector("#user_name").innerText=data.name
    document.querySelector("#bio").innerText=data.bio
    document.querySelector("#location").href=data.location
    document.querySelector("#location").innerText=data.location
    document.querySelector("#twitter").innerText=data.twitter
    document.querySelector("#github_url").href=data.html_url
    document.querySelector("#github_url").innerText=data.html_url
})
const loadRepositories = () => { 
    reposit.innerHTML = '';
    pagination.style.display = 'none';
    fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${currentPage}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
.then((repos)=>{ 
        displayRepositories(repos);
        updatePagination(repos);
})
.catch(error => console.error('Error fetching repositories:', error));
}
const displayRepositories = (repositories) => {
    repositories.forEach((repo) => {
        const table=document.createElement("div")
        table.classList.add("col-4","repo")
        const name=document.createElement("a")
        name.innerText=repo.name
        name.href=repo.html_url
        name.target="_blank"
        name.classList.add("repo_name")
        table.appendChild(name)
        const description=document.createElement("p")
        description.innerText=repo.description
        table.appendChild(description)
        repo.topics.map((topic)=>{
            const btn=document.createElement("button")
            btn.classList.add("btn" ,"btn-primary")
            btn.innerText=topic
            table.appendChild(btn)
        })
        reposit.appendChild(table)
    });
  };
  loadRepositories();
  const updatePagination = (data) => {
    if (data.length === 0){
      // No repositories on the current page
      reposit.innerHTML = '<li class="list-group-item text-center">No repositories available for this account.</li>';
      return;
    }
  
    const totalPages = Math.ceil(data.length / 10);
    pagination.style.display = 'block';
    for (let i = 1; i <= {}; i++) {
      const pageElement = document.getElementById(`page${i}`);
      const pageLink = pageElement.querySelector('.page-link');
      const pageNumber = currentPage + i - 1;
  
      if (pageNumber <= totalPages) {
        pageLink.textContent = pageNumber;
        pageElement.style.display = 'block';
      } else {
        pageElement.style.display = 'none';
      }
    }
  }
  const changePage = (delta) => {
    const newPage = currentPage + delta;
    if (newPage >= 1) {
      currentPage = newPage;
      loadRepositories();
    }
  };