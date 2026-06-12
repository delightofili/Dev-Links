import { ImageResponse } from "next/og";
import { getUserByUsername } from "@/lib/db";

export const alt = "User Profile Card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);

  const displayName = user ? user.name : "DevLinks User";
  const displayTag = user ? `@${user.username}` : "";
  const displayBio =
    user?.bio || "Check out this developer's profile on DevLinks.";

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Dev<span style={{ color: "#22c55e" }}>Links</span>
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#737373",
            fontFamily: "monospace",
          }}
        >
          &lt;/&gt;
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#ffffff",
            margin: 0,
          }}
        >
          {displayName}
        </h1>
        <p style={{ fontSize: "32px", color: "#22c55e", margin: 0 }}>
          {displayTag}
        </p>
        <p
          style={{
            fontSize: "24px",
            color: "#a3a3a3",
            maxWidth: "800px",
            lineHeight: "1.5",
          }}
        >
          {displayBio}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid #1f1f1f",
          paddingTop: "24px",
          fontSize: "20px",
          color: "#525252",
        }}
      >
        devlinks.app/profile/{username}
      </div>
    </div>,
    { ...size },
  );
}
