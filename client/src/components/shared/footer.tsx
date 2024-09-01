import { routes } from "@/lib/routes";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-inherit flex justify-center p-4 mt-5 text-sm text-muted-foreground">
      &copy; 2024 Pinned | All Rights Reserved | 
      
      <Link to={routes.About} className="px-1 underline text-cyan-500">About</Link>
      |
      <Link to={routes.PrivacyPolicy} className="px-1 underline text-cyan-500">Privacy Policy</Link>
       | v 0.1.0
    </footer>
  )
}

export default Footer;
