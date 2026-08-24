export const social = [
  { url: "mailto:aayushshrestha874@gmail.com", name: "mail" },
  { url: "https://github.com/aayusheeyyy7", name: "github" },
  { url: "https://www.linkedin.com/in/david-heckhoff/", name: "linkedin" },
  { url: "https://x.com/keemanoodles7", name: "x" },
  //{ url: "https://www.instagram.com/davidhckh/", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
