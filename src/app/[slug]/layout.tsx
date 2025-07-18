export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
      {children}
    </div>
  );
}
