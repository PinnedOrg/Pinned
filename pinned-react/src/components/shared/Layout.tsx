import NavBar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

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
