import { routes } from "@/lib/routes";
import { Link } from 'react-router-dom';

const PageDoesNotExistErrorMessage = () => {
    return (
      <div className="text-center text-muted-foreground h-[80vh] flex flex-col justify-center">
          
          <h1 className="w-full text-3xl font-medium">The page you are looking for does not exist.
            <Link to={routes.Home}>
                {" "}<u>Go back home</u>
            </Link></h1>
          <p className="mt-2 text-sm ">If this was an error, please report to {" "}
              <a href="mailto:pinnedorg@gmail.com" className="underline text-cyan-500 hover:cursor-pointer">pinnedorg@gmail.com</a>
          </p>
      </div>
    )
  }
  
  export default PageDoesNotExistErrorMessage;
  