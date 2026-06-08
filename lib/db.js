import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "db", "devLinks.db"));

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    tags TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS upvotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    link_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, link_id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    link_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS follows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(follower_id, following_id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    link_id INTEGER,
    is_read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    link_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE,
    UNIQUE (user_id, link_id)
  );
`);

// USERS
export function getUsers() {
  return db.prepare("SELECT * FROM users").all();
}

export function createUser({ name, username, email, password }) {
  try {
    const stmt = db.prepare(
      "INSERT INTO users (name, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
    );
    stmt.run(name, username, email, password, new Date().toISOString());
  } catch {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("Username or email is already taken");
    }
  }
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function getUserById(id) {
  return db
    .prepare(
      "SELECT id, name, username, email, avatar, bio, created_at FROM users WHERE id = ?",
    )
    .get(id);
}

export function getUserByUsername(username) {
  return db
    .prepare(
      "SELECT id, name, username, email, avatar, bio, created_at FROM users WHERE username = ?",
    )
    .get(username);
}

// LINKS
export function getLinks() {
  return db
    .prepare(
      `
      SELECT links.*, users.name, users.username, users.avatar,
      COUNT(upvotes.id) as upvotes_count FROM links
      LEFT JOIN users on links.user_id = users.id
      LEFT JOIN upvotes on links.id = upvotes.link_id
      GROUP BY links.id
      ORDER BY links.created_at DESC
      LIMIT 20
      `,
    )
    .all();
}

export function getLinkById(id) {
  return db
    .prepare(
      `
    SELECT
       links.*,
       users.name,
       users.username,
       users.avatar,
        COUNT(upvotes.id) as upvotes_count
      FROM links
      LEFT JOIN users ON links.user_id = users.id
      LEFT JOIN upvotes ON links.id = upvotes.link_id
      WHERE links.id = ?
      GROUP BY links.id  
    `,
    )
    .get(id);
}

export function createLink({ userId, description, url, tags }) {
  const stmt = db.prepare(
    "INSERT INTO links (user_id, description, url, tags, created_at) VALUES (?, ?, ?, ?, ?)",
  );
  stmt.run(userId, description, url, tags || null, new Date().toISOString());
}
