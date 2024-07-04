import { useTheme } from "@/components/shared/ThemeProvider"

const ClubHubBanner = () => {
  const { theme } = useTheme();
  
  return (
    <div className="h-[20rem] w-full text-center flex flex-col justify-end pb-12" style={{
        backgroundImage: `linear-gradient(${theme === 'light' ? 'rgba(0,0,0,.2), rgba(0,0,0,0.52), rgba(0,0,0,0.5)),' : 'rgba(0,0,0,.9), rgba(0,0,0,0.7), rgba(0,0,0,0.9)),'}\
                         url(/images/WaterlooStudents.jpg)`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center top', 
        backgroundRepeat: 'no-repeat'
      }}>
        <h1 className="mb-5 text-5xl font-bold tracking-wide text-gray-200 dark:text-gray-300">
          The Club Hub{/*<span className="px-2 py-1 rounded-lg bg-primary">Hub</span>*/}
        </h1>
        <p className="text-lg font-medium text-gray-300 dark:text-gray-400">Find all the clubs and organizations UWaterloo has to offer!</p>
      </div>
  )
}

export default ClubHubBanner
