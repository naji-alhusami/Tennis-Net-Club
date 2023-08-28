// this to fetch data in markdown

import fs from "fs"; // file system
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts"); //current wroking directory - path of the whole project folder

export function getPostsFiles () {
    return fs.readdirSync(postsDirectory); // read all the files names with extensions
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);


  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles(); 

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getBestPosts() {
  const allPosts = getAllPosts();

  const bestPosts = allPosts.filter((post) => post.isBest);

  return bestPosts;
}
