// Get server running
require('dotenv').config();


const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/api/latest-commit', async (req, res) => {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  try {
    // Step 1: Get all repos
    const repoResponse = await fetch(`https://api.github.com/user/repos?per_page=100`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });

    const repos = await repoResponse.json();

    // Step 2: Fetch last commit date for each repo
    const repoCommitData = await Promise.all(repos.map(async (repo) => {
      const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`;
      const commitsResponse = await fetch(commitsUrl, {
        headers: {
          Authorization: `token ${token}`
        }
      });

      const commits = await commitsResponse.json();
      const lastCommitDate = commits[0]?.commit?.committer?.date;

      return {
        name: repo.name,
        lastCommitDate
      };
    }));

    // Step 3: Sort by latest commit
    const latest = repoCommitData
      .filter(r => r.lastCommitDate)
      .sort((a, b) => new Date(b.lastCommitDate) - new Date(a.lastCommitDate))[0];

    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
