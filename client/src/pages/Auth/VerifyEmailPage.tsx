import { axiosInstance } from "@/lib/utils";
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { routes } from "@/lib/routes";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    
    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        //TODO: check if token has already been verified
        axiosInstance.post(`/api/auth/verify-email?token=${token}`)
        .then(() => {
            setIsSuccess(true);
            setIsLoading(false);
            console.log('Email verified');
        })
        .catch(() => {
            console.log('Error verifying email');
            setIsSuccess(false);
            setIsLoading(false);
        });
    }, [token]);

    return (
        <div className="text-center text-muted-foreground h-[80vh] flex flex-col justify-center items-center container">
            {isLoading ? 
            <>
                <LoadingSpinner />
                <h1 className="mt-4 w-full text-3xl font-medium">Verifying email...</h1>
            </>
            : isSuccess ?
            <>
                <h1 className="w-full text-3xl font-medium text-green-500">Email verified</h1>
                <p className="mt-2 text-sm ">You can now{" "}
                    <Link to={routes.Home} className="underline">
                        sign in
                    </Link>
                    {" "}to your account</p>
            </>
            :
            <>
            <h1 className="w-full text-3xl font-medium text-red-600">Error verifying email</h1>
            <p className="mt-2 text-sm w-[80%] text-center">If this was an error, please report to {" "}
                <a href="mailto:pinnedorg@gmail.com" className="underline text-cyan-500 hover:cursor-pointer">pinnedorg@gmail.com</a>
            </p>
            </>
            }
      </div>
    );
}

export default VerifyEmailPage;