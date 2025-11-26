# Contributing to Git Tutorial

Thank you for your interest in contributing to this project! 🎉

## Adding Yourself to the Contributors List

If you've completed the tutorial and want to be recognized as a learner, follow these steps:

### Steps

1. **Fork this repository**
   - Click the "Fork" button at the top right of this repository

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/git-tutorial.git
   cd git-tutorial
   ```

3. **Create a new file in the `learners` folder**
   - Name it with your GitHub username (e.g., `JohnDoe.md`)
   - Add the following content:
   ```markdown
   Your Display Name
   <emoji>
   https://github.com/yourusername
   ```
   
   Example:
   ```markdown
   Kooroshkz
   😜
   https://github.com/kooroshkz
   ```

4. **Commit and push your changes**
   ```bash
   git add learners/YourUsername.md
   git commit -m "Add YourName to contributors"
   git push origin main
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Submit the PR

### What Happens Next?

Once you submit your pull request:

1. 🤖 **Automatic Update**: A GitHub Action will automatically run and update the main `README.md` with your name and emoji
2. ✅ **Review**: The maintainer will review your PR
3. 🎉 **Merge**: Once approved, your contribution will be merged and you'll appear in the contributors list!

The automation script (`scripts/update-contributors.js`) reads all markdown files in the `learners/` directory and generates an alphabetically sorted list of contributors in the main README.

## Questions?

If you have any questions or run into issues, feel free to open an issue or reach out to the maintainer.

Happy learning! 🚀
