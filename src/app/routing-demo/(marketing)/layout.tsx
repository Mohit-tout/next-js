
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <header>
      Header
    </header>
    {children}
    <footer>
      Footer
    </footer>
  </>
}
