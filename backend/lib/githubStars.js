const query = `
        query {
         repository(owner: "m-tabish", name: "bluprnt") {
            stargazers {
              totalCount
            }
          }
        }
      `
export async function getRepoStars() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({ query })
  });

  const result = await response.json();
  
  // 🔥 IMPORTANT SAFETY CHECK
  if (result.errors) {
    console.error("GitHub GraphQL errors:", result.errors);
    throw new Error(result.errors[0].message);
  }
 
  return result.data.repository.stargazers.totalCount;
}
