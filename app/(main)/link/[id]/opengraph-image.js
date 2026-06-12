import { getLinkById } from "@/lib/db";
import { ImageResponse } from "next/og";

export const alt = "DevLinks Post Preview";
export const size = { width: 120, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const link = getLinkById(id);

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px",
        border: "4px solid #10b981",
      }}
    >
      <div style={{ color: "#a3a3a3", fontSize: "24px", fontWeight: "bold" }}>
        DEVLINK COMMUNITY FEED
      </div>
      <div
        style={{
          color: "#10b981",
          fontSize: "64px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
      >
        &quot;{link?.title || "Shared Link"}&quot;
      </div>
      <div style={{ display: "flex", marginTop: "auto" }}>
        <span
          style={{
            background: "#171717",
            color: "#10b981",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "20px",
          }}
        >
          {link?.category.toUpperCase()}
        </span>
      </div>
    </div>,
  );
}
