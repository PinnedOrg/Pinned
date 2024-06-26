import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <NavBar />
        {children}
        <Footer />
    </>
  )
}

export default Layout;
