# Lasse Giorgio Lemmer - Personal Portfolio Website

This is a standalone, high-performance personal portfolio website built with pure HTML5, CSS3, and JavaScript. It is designed to be hosted directly on **GitHub Pages**.

## How to Deploy to GitHub Pages (Step-by-Step)

Since this portfolio is completely independent of the `music-roulette` application, you should move this folder out of the application directory and upload it to its own GitHub repository.

### Step 1: Move the Portfolio Folder
Move the `portfolio/` folder to a separate location (e.g., your Desktop or a dedicated projects folder) and rename it to match your GitHub repository name:
```bash
# Rename the folder to your GitHub Pages repository format
lasle.github.io
```

### Step 2: Create a New GitHub Repository
1. Go to [github.com](https://github.com/) and log in as **`lasle`**.
2. Click **New** to create a new repository.
3. **Important:** Name the repository exactly:
   `lasle.github.io`
4. Set the repository visibility to **Public**.
5. Leave "Add a README file", ".gitignore", and "Choose a license" **unchecked**.
6. Click **Create repository**.

### Step 3: Initialize Git and Push Your Code
Open your terminal, navigate to the renamed portfolio folder on your Desktop, and run the following commands:

```bash
# 1. Navigate into your portfolio folder
cd ~/Desktop/lasle.github.io

# 2. Initialize a local Git repository
git init

# 3. Add all portfolio files (index.html, styles.css, script.js, etc.)
git add .

# 4. Create your initial commit
git commit -m "Initial commit of portfolio website"

# 5. Rename your default branch to main
git branch -M main

# 6. Link your local repository to your remote GitHub repository
git remote add origin https://github.com/lasle/lasle.github.io.git

# 7. Push your code to GitHub
git push -u origin main
```

### Step 4: Verify Deployment
1. Go to your repository page on GitHub.
2. Click on **Settings** (top navigation bar).
3. Under the left menu, select **Pages**.
4. Under **Build and deployment**, make sure the source is set to **Deploy from a branch**, and the branch is set to **`main`** and **`/ (root)`**.
5. After a minute or two, your portfolio will be live at:
   `https://lasle.github.io`
