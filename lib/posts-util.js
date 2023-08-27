// this to fetch data in markdown

import fs from "fs"; // file system
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts"); //current wroking directory - path of the whole project folder

function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory); // read all the content synchronously

  postFiles.map((postFile) => {
    return getPostData(postFile);
  });
}
