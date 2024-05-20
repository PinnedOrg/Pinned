import NavBar from "@/components/navbar/NavBar";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <NavBar />
        {children}
    </>
  )
}

export default Layout;
