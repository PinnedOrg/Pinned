import { cloneElement, ReactElement, ReactNode, useState } from "react";

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

type AuthModalProps = {
    children: ReactNode;
    mode?: ModalTypes;
}

enum ModalTypes {
    SignIn = "sign-in",
    SignUp = "sign-up",
    ResetPassword = "reset-password"
}

enum ResetPasswordSteps {
    Email = 0,
    Code = 1,
    NewPassword = 2
}

const AuthModal = ({ children, mode }: AuthModalProps) => {
    const { signIn } = useSignIn();
    const [open, setOpen] = useState<boolean>(false);
    const [showPasswordValue, setShowPasswordValue] = useState<boolean>(false);
    const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState<boolean>(false);
    
    const [modalMode, setModalMode] = useState<ModalTypes>(mode || ModalTypes.SignIn);
    const [resetPasswordStep, setResetPasswordStep] = useState<ResetPasswordSteps>(ResetPasswordSteps.Email);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');


    const isModeSignIn = modalMode === ModalTypes.SignIn;
    const isModeSignUp = modalMode === ModalTypes.SignUp;
    const isModeResetPassword = modalMode === ModalTypes.ResetPassword;
    const showPasswordField = (isModeResetPassword && resetPasswordStep === ResetPasswordSteps.NewPassword) || isModeSignIn || isModeSignUp;
    const showPrivacyPolicy = isModeSignIn || isModeSignUp;
    
    
    const handleTriggerClick = () => {
        setOpen(true);
    }

    const handleModeSwitch = (switchToReset: boolean) => {
        setModalMode(switchToReset ? ModalTypes.ResetPassword : isModeSignIn ? ModalTypes.SignUp : ModalTypes.SignIn);
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

    const handleResetPassword = async () => {
        switch (resetPasswordStep) {
            case ResetPasswordSteps.Email:
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                await axiosInstance.post(`/api/users/reset-password`, { email }, config)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: res.data.message,
                        variant: 'default'
                    });
                    setResetPasswordStep(ResetPasswordSteps.Code);
                })
                .catch((err) => {
                    toast({
                        title: err.response?.data?.message || err.message,
                        variant: 'destructive'
                    });
                });
                break;
            case ResetPasswordSteps.Code:
                // verify code
                break;
            case ResetPasswordSteps.NewPassword:
                // reset password
                break;
            default:
                break;
        }
    }
        
    const handleSubmit = async () => {
        if (isModeResetPassword) {
            await handleResetPassword();
            return;
        }

        let errorMessage = '';
        if (isModeSignUp && !firstName) {
            errorMessage = "First Name is required";
        } else if (isModeSignUp && !lastName) {
            errorMessage = "Last Name is required";
        } else if (!email) {
            errorMessage = "Email is required";
        } else if (!password) {
            errorMessage = "Password is required";
        } else if (isModeSignUp && password !== confirmPassword) {
            errorMessage = "Passwords do not match";
        }
    
        if (errorMessage) {
            toast({
                title: errorMessage,
                variant: 'destructive'
            });
            return;
        }

        if (isModeSignIn) {
            await handleSignIn();
        } else {
            await handleSignUp();
        }
    }
      
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {cloneElement(children as ReactElement, { onClick: handleTriggerClick })}
            </DialogTrigger>
            <DialogContent className="w-[24rem]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{isModeResetPassword ? 'Reset Password' : isModeSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <div className="mt-1">
                    {isModeSignUp && <div className="flex gap-4">
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
                    {showPasswordField && <div className="relative">
                        <Input
                            value={password}
                            type={showPasswordValue ? "text" : "password"}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${isModeSignUp ? "mb-4" : ""} border-muted-foreground bg-background ${password ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                        <button type="button" onClick={() => setShowPasswordValue(!showPasswordValue)} className='absolute right-4 text-xl top-[0.7rem]'>
                            {showPasswordValue ? (<FaEyeSlash />) : (<FaEye />)}
                        </button>
                    </div>}
                    {isModeSignUp && <div className="relative">
                        <Input
                            value={confirmPassword}
                            type={showConfirmPasswordValue ? "text" : "password"}
                            required
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mb-6 border-muted-foreground bg-background ${confirmPassword ? "text-accent-foreground" : "text-muted-foreground"}`}
                        />
                        <button type="button" onClick={() => setShowConfirmPasswordValue(!showConfirmPasswordValue)} className='absolute right-4 text-xl top-[0.7rem]'>
                            {showConfirmPasswordValue ? (<FaEyeSlash />) : (<FaEye />)}
                        </button>
                    </div>}
                    {isModeSignIn && <div className="flex justify-end w-full mt-1">
                        <Button 
                            variant={'link'} 
                            className="p-0 text-cyan-700"
                            onClick={() => handleModeSwitch(true)}
                        >
                            Reset Password
                        </Button>
                    </div>}
                    <Button 
                        variant="secondary"
                        className="mt-1 w-full px-5 py-2 text-sm font-semibold tracking-wide text-white uppercase"
                        onClick={handleSubmit}
                        type="submit"
                    >
                        {isModeResetPassword ? "Send Reset Code" : modalMode === "sign-up" ? "Sign Up" : "Sign In"}
                    </Button>
                    {showPrivacyPolicy && <div className="flex justify-center mt-1">
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
                    </div>}
                </div>
                <DialogFooter className="border-t-2 border-muted">
                    <div className="flex justify-center w-full mt-2"> 
                        <Button 
                            variant={'link'} 
                            className="text-accent-foreground"
                            onClick={() => handleModeSwitch(false)}
                        >
                            {isModeSignIn ? "Sign Up" : "Sign In"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal;