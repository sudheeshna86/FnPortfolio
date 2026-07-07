/**
 * Portfolio API - API route for fetching portfolio data
 */
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

// This would read from a database or JSON file in production
// For now, we'll return the default data structure
export const getPortfolioData = () => ({
  profile: {
    name: "Matta Sudheeshna",
    short: "Sudheeshna",
    title: "B.Tech CSE Student • DSA & Competitive Programming • MERN Developer",
    location: "Visakhapatnam, India",
    email: "sudheehoney2806@gmail.com",
    github: "https://github.com/sudheeshna86",
    linkedin: "https://www.linkedin.com/in/sudheeshna-matta-3a60a3296/",
    leetcode: "https://leetcode.com/u/sudheeshna_08/",
    codechef: "https://www.codechef.com/users/sudheeshna_8",
    tagline: "B.Tech student focused on DSA, competitive programming, and full-stack development with the MERN stack.",
  },
  // Data will be populated from data.ts for now
});

export const Route = createFileRoute("/api/portfolio/api")({
  beforeLoad: async () => {
    return getPortfolioData();
  },
});
