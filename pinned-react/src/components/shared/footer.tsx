import { routes } from "@/lib/routes";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex justify-center p-4 mt-5 text-sm text-muted-foreground">
      &copy; 2024 Pinned | All Rights Reserved | 
      
      <Link to={routes.About} className="px-1 underline text-cyan-500">About</Link>
       | v1.0.0
    </footer>
  )
}

export default Footer;
