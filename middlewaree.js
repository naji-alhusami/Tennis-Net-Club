import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, req }) {
      if (req.session.user) {
        // User is already authenticated, redirect to a different page
        return "/";
      }
      return url;
    },
  },
});

export const config = {
  matcher: ["/reservation", "/calendar", "/partner", "/manage"],
};