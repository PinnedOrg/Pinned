import GradientBackground from "@/components/shared/gradientbackground";

const PrivacyPolicyPage = () => {
    return (
        <section className='mt-8'>
            <GradientBackground />
            <section className="container pb-10 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-center md:text-4xl">
                    Privacy Policy
                </h2>
                <div className="mt-5 container place-self-center max-w-[50rem]" >
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Log Files</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        UW Pinned follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. If you choose to register a club, we will store all of its associated information.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Cookies and Web Beacons</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        Like any other website, UW Pinned uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The data are used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Third Party Services</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        At UW Pinned, we use a host of open source technologies and external libraries that process, but do not store your data. We also use third party authentication services from Clerk, and image delivery services from Imagekit.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Cookies and Web Beacons</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        UW Pinned's Privacy Policy does not apply other software. Thus, we are advising you to consult the respective Privacy Policies of these third parties for more detailed information. This may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here:{" "}
                        <a className="text-cyan-500 underline" href="https://clerk.com/legal/privacy">https://clerk.com/legal/privacy</a>,{" "}
                        <a className="text-cyan-500 underline" href="https://imagekit.io/privacy-policy-new/">https://imagekit.io/privacy-policy-new/</a>.
                        You can choose to disable cookies through your individual browser options. More detailed information regarding cookie management with specific web browsers can be found at the browser’s websites.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Information Regarding Children</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        UW Pinned does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Data Deletion</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        To request data deletion for your UW Pinned account, please email us at{" "}
                        <a href="mailto:pinnedorg@gmail.com" className="text-cyan-500 underline">
                            pinnedorg@gmail.com
                        </a>.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Online Privacy Policy Only</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in UW Pinned. This policy is not applicable to any information collected offline or via channels other than this website.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Consent</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in UW Pinned. This policy is not applicable to any information collected offline or via channels other than this website.
                    </p>
                    <h3 className="mt-4 font-medium text-lg md:text-xl">Online Privacy Policy Only</h3>
                    <p className=" mt-1 text-muted-foreground font-normal">
                        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                    </p>
                </div>
                <p className="mt-4 text-base text-center md:text-xl lg:px-20 text-muted-foreground">
                </p>
            </section>
        </section>
    )
}

export default PrivacyPolicyPage;