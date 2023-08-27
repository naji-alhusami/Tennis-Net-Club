import AllPosts from "@/components/posts/all-posts";

import factsAboutTennis from "@/public/images/factsAboutTennis.jpg";

function AllPostsPage() {
  const data = [
    {
      title: "FACTS ABOUT TENNIS",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis",
    },
    {
      title: "FACTS ABOUT TENNIS2",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis2",
    },
    {
      title: "FACTS ABOUT TENNIS3",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis3",
    },
  ];

  return <AllPosts posts={data} />;
}

export default AllPostsPage;
