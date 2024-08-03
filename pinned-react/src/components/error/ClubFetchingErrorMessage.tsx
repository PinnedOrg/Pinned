
const ClubFetchingErrorMessage = () => {
  return (
    <div className="w-full text-center text-muted-foreground">
        <h1 className="w-full text-3xl font-medium">Error fetching clubs</h1>
        <p className="mt-2 text-sm ">Please report any errors to {" "}
            <a href="mailto:pinnedorg@gmail.com" className="underline text-cyan-500 hover:cursor-pointer">pinnedorg@gmail.com</a>
        </p>
    </div>
  )
}

export default ClubFetchingErrorMessage;
