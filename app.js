
document.querySelector('.projects').addEventListener('click',function(e){ //listens for all clicks on parent container
    const target = e.target;
    if (target.matches('.read-more')){
        const hiddenContent = target.previousElementSibling;
        const isVisible = hiddenContent.classList.toggle('reveal-button');
        target.textContent = isVisible ? 'read less':'read more'

    }

})

document.querySelector('.contributions').addEventListener('click',function(e){
    const target = e.target;
    if (target.matches('.read-more')){
        const hiddenContent = target.previousElementSibling;
        const isVisible = hiddenContent.classList.toggle('reveal-button');
        target.textContent = isVisible ? 'read less':'read more'

    }

})

fetch('https://portfolio-site-s775.onrender.com/api/latest-commit')
  .then(res => res.json())
  .then(data => {
    console.log("Latest repo:", data.name);
    console.log("Last updated:", new Date(data.lastCommitDate).toLocaleString());
      const container = document.getElementById('latest-commit-info');
      const parentContainer = document.getElementById('status')
      if (data && data.name && data.lastCommitDate) {
          parentContainer.classList.toggle('positive-indicator');
          const repo_name = data.name.replace("_"," ");
          container.innerHTML = `
                <strong>Latest updated repo:</strong> ${repo_name}<br>
                <strong>Last commit:</strong> ${new Date(data.lastCommitDate).toLocaleString()}
                `;
      } else {
          parentContainer.classList.toggle('negative-indicator');
          container.innerHTML = "Could not load commit data.";
      }
  })
    .catch(err => {
        const parentContainer = document.getElementById('status')
        document.getElementById('latest-commit-info').innerText = "Error loading latest commit.";
        parentContainer.classList.toggle('negative-indicator');
        console.error("Fetch error:", err);
  });
