import { useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/utils";
import { useSignIn } from "@clerk/clerk-react";
import { ToastAction } from "@radix-ui/react-toast";

type ModalTypes = "sign-in" | "sign-up" | "forgot-password";

const AuthModal = () => {
    const { signIn } = useSignIn();
    const [open, setOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    
    const [modalMode, setModalMode] = useState<ModalTypes>('sign-in');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleModeSwitch = (switchToForgot: boolean) => {
        setModalMode(switchToForgot ? 'forgot-password' : modalMode === 'sign-in' ? 'sign-up' : 'sign-in');
    }

    const handleResendVerificationEmail = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        await axiosInstance.post(`/api/users/send-verification-email`, { email }, config)
        .then((res) => {
            toast({
                title: res.data.message,
                variant: 'default'
            })
        })
        .catch((err) => {
            toast({
                title: err.message,
                variant: 'destructive'
            })
        })
    }

    const handleSignIn = async () => {
        // ensure user is verified
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axiosInstance.post('/api/users/sign-in', {
                email,
                password
            }, config);
        } catch (error: any) {
            const isUserUnverified = error.response.status === 403;

            toast({
                title: error.response.data.message,
                variant: 'destructive',
                ...(isUserUnverified && {action: <ToastAction className="text-xs hover:text-gray-200 underline" onClick={handleResendVerificationEmail} altText="Resend Verification Email">Resend Verification Email</ToastAction>}) // only is user exists and is unverified
            });
            return;
        } 
        
        // clerk session creation
        try { 
            const result = await signIn?.create({
                identifier: email,
                strategy: 'password',
                password: password,
            });
        
            if (result?.status === 'complete') {
                toast({
                    title: "Logged in successfully",
                    variant: 'default'
                });
            }
            setOpen(false);
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.errors[0].message,
                variant: 'destructive'
            });
        }
    }

    const handleSignUp = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axiosInstance.post(`/api/users/sign-up`, {
            email,
            password,
            firstName,
            lastName,
            confirmPassword
        }, config)
        .then((res) => {
            console.log(res.data);
            toast({
                title: "Success! Check your inbox for a verification link then login",
                variant: 'default'
            });
            setOpen(false);
        })
        .catch((err) => {
            toast({
                title: err.response?.data?.message || err.message,
                variant: 'destructive'
            });
        });
    }
        

    const handleSubmit = async () => {
        let errorMessage = '';
        if (modalMode === 'sign-up' && !firstName) {
            errorMessage = "First Name is required";
        } else if (modalMode === 'sign-up' && !lastName) {
            errorMessage = "Last Name is required";
        } else if (!email) {
            errorMessage = "Email is required";
        } else if (!password) {
            errorMessage = "Password is required";
        } else if (modalMode === 'sign-up' && password !== confirmPassword) {
            errorMessage = "Passwords do not match";
        }
    
        if (errorMessage) {
            toast({
                title: errorMessage,
                variant: 'destructive'
            });
            return;
        }

        if (modalMode === 'sign-in') {
            await handleSignIn();
        } else {
            await handleSignUp();
        }
    }

    // const mutation = useMutation({
    //     mutationFn: handleSubmit,
    // });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="secondary" 
                    className="px-3 py-2 text-sm font-semibold tracking-wide text-white uppercase hover:bg-secondary-hover"
                    onClick={() => setOpen(true)}
                >
                    Sign In
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[24rem]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{modalMode === 'sign-up' ? "Sign Up" : "Sign In"}</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <div className="mt-1">
                    {modalMode === 'sign-up' && <div className="flex gap-4">
                        <Input
                            value={firstName}
                            type="text"
                            required
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`mb-4 border-muted-foreground bg-background ${firstName ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                        <Input
                            value={lastName}
                            type="text"
                            required
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className={`mb-4 border-muted-foreground bg-background ${lastName ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                    </div>}
                    <Input
                        value={email}
                        type="email"
                        required
                        placeholder="Waterloo Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={`mb-4 border-muted-foreground bg-background ${email ? "text-accent-foreground" : "text-muted-foreground"}`}
                    />
                    <div className="relative">
                        <Input
                            value={password}
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${modalMode === 'sign-up' ? "mb-4" : ""} border-muted-foreground bg-background ${password ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-4 text-xl top-[0.7rem]'>
                            {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                        </button>
                    </div>
                    {modalMode === 'sign-up' && <div className="relative">
                        <Input
                            value={confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={` border-muted-foreground bg-background ${confirmPassword ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-4 text-xl top-[0.7rem]'>
                            {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                        </button>
                    </div>}
                    <div className="flex justify-end w-full my-1">
                        <Button 
                            variant={'link'} 
                            className="p-0 text-cyan-700"
                            // onClick={() => handleModeSwitch(true)}
                        >
                            Forgot Password?
                        </Button>
                    </div>
                    <Button 
                        variant="secondary"
                        className="w-full px-5 py-2 text-sm font-semibold tracking-wide text-white uppercase"
                        onClick={handleSubmit}
                        type="submit"
                    >
                        {modalMode === "sign-up" ? "Sign Up" : "Sign In"}
                    </Button>
                    <div className="flex justify-center mt-1">
                        <Button 
                            variant={'link'} 
                            className="text-muted-foreground hover:no-underline"
                            onClick={() => setOpen(false)}
                        >
                            Read our 
                            <Link className="ml-1 underline" to={routes.PrivacyPolicy}>
                                Privacy Policy
                            </Link>
                        </Button>
                    </div>
                </div>
                <DialogFooter className="border-t-2 border-muted">
                    <div className="flex justify-center w-full mt-2"> 
                        <Button 
                            variant={'link'} 
                            className="text-accent-foreground"
                            onClick={() => handleModeSwitch(false)}
                        >
                            {modalMode === 'sign-in' ? "Sign Up" : "Sign In"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal;