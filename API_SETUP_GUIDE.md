/**
 * Portfolio API Setup Guide
 * This file provides example implementations for persisting portfolio data
 * 
 * Choose one approach based on your deployment environment:
 */

// ============================================================================
// APPROACH 1: JSON FILE-BASED (Simplest, works with Vercel/Node)
// ============================================================================

import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "portfolio-data.json");

export async function getPortfolioDataFromFile() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return getDefaultPortfolioData();
  }
}

export async function savePortfolioDataToFile(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// ============================================================================
// APPROACH 2: LOCAL STORAGE (Browser-based, not recommended for production)
// ============================================================================

// Store in browser's localStorage
// ⚠️ WARNING: Don't use in production, data is limited and unencrypted

// ============================================================================
// APPROACH 3: SQLITE (Lightweight database, great for small projects)
// ============================================================================

// import Database from "better-sqlite3";
// 
// const db = new Database("portfolio.db");
// 
// export function getPortfolioDataFromDB() {
//   const row = db.prepare("SELECT * FROM portfolio WHERE id = 1").get();
//   return row?.data ? JSON.parse(row.data) : getDefaultPortfolioData();
// }
// 
// export function savePortfolioDataToDB(data: any) {
//   db.prepare("UPDATE portfolio SET data = ? WHERE id = 1").run(
//     JSON.stringify(data)
//   );
// }

// ============================================================================
// APPROACH 4: POSTGRESQL (Production-ready)
// ============================================================================

// import { Pool } from "pg";
// 
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// 
// export async function getPortfolioDataFromDB() {
//   const result = await pool.query(
//     "SELECT data FROM portfolio WHERE id = 1"
//   );
//   return result.rows[0]?.data || getDefaultPortfolioData();
// }
// 
// export async function savePortfolioDataToDB(data: any) {
//   await pool.query(
//     "UPDATE portfolio SET data = $1, updated_at = NOW() WHERE id = 1",
//     [JSON.stringify(data)]
//   );
// }

// ============================================================================
// EXAMPLE API ENDPOINT IMPLEMENTATIONS
// ============================================================================

/**
 * Example: GET /api/portfolio
 * 
 * Express.js:
 * router.get("/portfolio", async (req, res) => {
 *   const data = await getPortfolioDataFromFile();
 *   res.json(data);
 * });
 * 
 * TanStack React Start (h3):
 * export default defineEventHandler(async () => {
 *   return await getPortfolioDataFromFile();
 * });
 */

/**
 * Example: POST /api/portfolio
 * 
 * Express.js:
 * router.post("/portfolio", authenticateAdmin, async (req, res) => {
 *   const { body } = req;
 *   await savePortfolioDataToFile(body);
 *   res.json({ success: true });
 * });
 * 
 * TanStack React Start (h3):
 * export default defineEventHandler(async (event) => {
 *   const body = await readBody(event);
 *   await savePortfolioDataToFile(body);
 *   return { success: true };
 * });
 */

/**
 * Example: Image Upload
 * 
 * Express.js:
 * router.post("/upload", upload.single("file"), async (req, res) => {
 *   const file = req.file;
 *   const filename = `${Date.now()}-${file.originalname}`;
 *   await sharp(file.buffer)
 *     .resize(1200, 800, { fit: "cover" })
 *     .toFile(`./public/uploads/${filename}`);
 *   res.json({ url: `/uploads/${filename}` });
 * });
 */

export function getDefaultPortfolioData() {
  return {
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
      tagline:
        "B.Tech student focused on DSA, competitive programming, and full-stack development with the MERN stack.",
    },
    skills: [],
    timeline: [],
    projects: [],
    achievements: [],
    certifications: [],
    codingProfiles: [],
    contact: {
      email: "sudheehoney2806@gmail.com",
      linkedin: "https://www.linkedin.com/in/sudheeshna-matta-3a60a3296/",
      github: "https://github.com/sudheeshna86",
    },
  };
}

// ============================================================================
// AUTHENTICATION HELPER
// ============================================================================

export function authenticateAdmin(password: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === correctPassword;
}

// ============================================================================
// EXAMPLE: ADDING TO TANSTACK REACT START
// ============================================================================

/**
 * Create: src/routes/api.portfolio.ts
 * 
 * import { createFileRoute } from "@tanstack/react-router";
 * import { defineEventHandler, readBody } from "h3";
 * 
 * export const Route = createFileRoute("/api/portfolio")({
 *   beforeLoad: async ({ request }) => {
 *     if (request.method === "GET") {
 *       return await getPortfolioDataFromFile();
 *     } else if (request.method === "POST") {
 *       const body = await readBody(request as any);
 *       if (!authenticateAdmin(body.password)) {
 *         throw new Error("Unauthorized");
 *       }
 *       await savePortfolioDataToFile(body.data);
 *       return { success: true };
 *     }
 *   },
 * });
 */

// ============================================================================
// TIPS FOR IMPLEMENTATION
// ============================================================================

/**
 * 1. Start Simple:
 *    - Use JSON file approach first
 *    - Get everything working
 *    - Migrate to database later if needed
 * 
 * 2. Image Management:
 *    - Use Cloudinary or AWS S3 for production
 *    - For development, save to /public/uploads
 *    - Compress images before storing
 * 
 * 3. Error Handling:
 *    - Always catch errors
 *    - Return meaningful messages
 *    - Log errors for debugging
 * 
 * 4. Validation:
 *    - Validate data structure
 *    - Check file size limits
 *    - Sanitize inputs
 * 
 * 5. Performance:
 *    - Cache frequently accessed data
 *    - Use database indexes
 *    - Compress large files
 * 
 * 6. Security:
 *    - Never expose passwords in logs
 *    - Use environment variables
 *    - Validate admin access for all API calls
 *    - Use HTTPS in production
 */
