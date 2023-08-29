import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";
import { Fragment } from "react";

// import factsAboutTennis from "@/public/images/factsAboutTennis.jpg";

function AllPostsPage(props) {
  // const data = [
  //   {
  //     title: "FACTS ABOUT TENNIS",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis",
  //   },
  //   {
  //     title: "FACTS ABOUT TENNIS2",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis2",
  //   },
  //   {
  //     title: "FACTS ABOUT TENNIS3",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis3",
  //   },
  // ];

  return (
    <Fragment>
      <Head>
        <title>All My Posts</title>
        <meta name="description" content="all posts tennis" />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
