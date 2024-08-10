import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, FilterIcon, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {IClub} from "@/lib/types";
import { filters } from "@/lib/data";
import {axiosInstance} from "@/lib/utils";

import ViewportWrapper from "@/components/shared/ViewportWrapper";
import GradientBackground from "@/components/shared/gradientbackground";

import ClubPreviewCard from "@/components/cards/ClubPreviewCard";
import ClubLoadingPlaceholder from "@/components/cards/ClubLoadingPlaceholder";

import ClubFetchingErrorMessage from "@/components/error/ClubFetchingErrorMessage.tsx";
import ClubNotFoundErrorMessage from "@/components/error/ClubNotFoundErrorMessage";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";

type FormDataType = {
  name: string,
  genre: string,
  cost: number,
  size: number,
  rating: number,
  showInactive: boolean,
}



const FetchClubs = ({ name, genre, cost, size, rating, showInactive }: FormDataType) => {
  return axiosInstance.get(`/api/clubs/?name=${name}&genre=${genre}&cost=${cost}&size=${size}&showInactive=${showInactive}&rating=${rating}`);
}

const resetFilters = () => {
  location.reload(); // refresh page, auto resets filters
}

const ClubHub = () => { 
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    genre: "",
    cost: -1,
    size: -1,
    rating: 0,
    showInactive: false,
  });

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);

  const [fetchingTrigger, setFetchingTrigger] = useState<boolean>(false);
  //const queryClient = useQueryClient(); // can be used for certain things, not too sure if will be needed

  const handleUpdateFilters = (newValue: string | number | boolean, filter: string) => {
    setFormData({
      ...formData,
      [filter]: newValue,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // prevent page refresh
    setFetchingTrigger(!fetchingTrigger); // trigger a data fetch
  }
  // fetch clubs from database
  const {isFetching, isError, data } = useQuery({
    queryKey: ["Clubs", fetchingTrigger], // query refreshes when this value changes
    queryFn: () => FetchClubs(formData),
  });

  return (
    <section>
      <GradientBackground />
      <div className="container flex flex-col items-center mt-12">
        <div className="flex flex-col items-center w-full">
          <h1 className="mb-3 text-5xl font-bold tracking-wide text-accent-foreground">
            The Club Hub
          </h1>
          <p className="text-lg font-medium text-muted-foreground">Find all the clubs and organizations UWaterloo has to offer!</p>
        </div>

        <section className="container flex flex-wrap justify-center p-4 px-4 mt-10 mb-5 space-y-4 bg-transparent lg:px-16 max-w-[80rem] w-full">
        <form className="flex items-center justify-center w-full space-x-2" onSubmit={(e) => handleSubmit(e)}>
          <Input
            className="w-[80%] border-muted-foreground bg-background text-muted-foreground px-5"
            placeholder="Search for a club"
            onChange={(e) => handleUpdateFilters(e.target.value, "name")}  
          />
          <Button type="submit" variant='secondary' className="text-accent-foreground">
            <ViewportWrapper breakpoint="large">
              Search
            </ViewportWrapper>
            <ViewportWrapper breakpoint="mobile">
              <Search />
            </ViewportWrapper>
          </Button>
        </form>

        <Collapsible className="w-full">
          <div className="flex justify-between">
            <CollapsibleTrigger 
              className="items-center w-full gap-3"
              onClick={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
            >
              <div className="flex text-accent-foreground">
                Additional Filters { isCollapsibleOpen ? <ChevronUp /> : <ChevronDown /> }
              </div>
            <hr className="w-[100%] border border-solid border-slate-500 rounded-full mt-1 "></hr>
            </CollapsibleTrigger>
          </div>
            
          
          <CollapsibleContent className={clsx("rounded-b-md px-2 pt-1 pb-4 shadow-md shadow-slate-200 dark:shadow-slate-800 transition-all duration-1000 overflow-hidden")}>
            <div className="flex gap-1 text-accent-foreground hover:cursor-pointer" onClick={resetFilters}>
              Reset
              <RotateCcw className="w-[1rem] h-auto " />
            </div>
            <div className="mt-2 flex flex-wrap justify-center lg:justify-evenly gap-x-6 lg:gap-x-[4rem] gap-y-2 w-full">
              <Select key="Genre" onValueChange={(newValue: string) =>  handleUpdateFilters(newValue, "genre")}>
                <SelectTrigger className=" min-w-[6rem] max-w-[18rem] border-slate-500" >
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(filters["Genre"]).map((option: string) => (
                    <SelectItem key={option} value={filters["Genre"][option]}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select key="Cost" onValueChange={(newValue: string) =>  handleUpdateFilters(parseInt(newValue), "cost")}>
                <SelectTrigger className=" min-w-[6rem] max-w-[18rem] border-slate-500" >
                  <SelectValue placeholder="Cost" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(filters["Cost"]).map((option: string) => (
                    <SelectItem key={option} value={filters["Cost"][option]}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select key="Size" onValueChange={(newValue: string) =>  handleUpdateFilters(parseInt(newValue), "size")}>
                <SelectTrigger className=" min-w-[6rem] max-w-[18rem] border-slate-500" >
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(filters["Size"]).map((option: string) => (
                    <SelectItem key={option} value={filters["Size"][option]}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center gap-4 p-6">
              <Label htmlFor="rating" className="text-accent-foreground">Rating</Label>
              <Slider 
                defaultValue={[0]} 
                min={0} 
                max={5} 
                step={1} 
                className="w-[12rem]"
                onValueChange={(newValue: number[]) => handleUpdateFilters(newValue[0], "rating")} 
              />
              <Label htmlFor="rating" className="flex gap-1 text-accent-foreground">
                {formData.rating}
                <FaStar className="text-accent-foreground" />
              </Label>
            </div>
            <div className="flex items-center mt-3 space-x-2">
              <Checkbox id="inactive" onCheckedChange={(checked: boolean) => handleUpdateFilters(checked, "showInactive")} />
              <label
                htmlFor="inactive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show inactive clubs
              </label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
        

        <section className="mt-14 flex min-h-[30rem] justify-end bg-transparent">
        {(isError || (data?.data.length === 0)) ? (
          <div className="mt-20">
            {isError ? (
              <ClubFetchingErrorMessage />
            ) : (
              <ClubNotFoundErrorMessage />
            )}
          </div>
        ) : (
          <div className={clsx(" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {"gap-6": data})}>
            {data ? data.data.map((club: IClub) => (
                <ClubPreviewCard club={club} key={club._id}/>
              )) : (
                <>
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                  <ClubLoadingPlaceholder />
                </>
              )}
              
          </div>
        )}
      </section>
      </div>
    </section>
  )
}

export default ClubHub;

//Dialog Filters implementation current bugs
// 1. Dialog does not work with default form, will need to use ShadCN's form. (can't link apply button to submit form and close dialog at the same time)
// 2. Clicking enter in the input field opens the dialog
// 3. Filters from state need to be populated when opening the dialog.

{/* <form className="flex items-center justify-center w-3/5 mt-16 space-x-2" onSubmit={(e) => handleSubmit(e)} onChange={() => console.log('change')}>
          <Dialog>
            <DialogTrigger tabIndex={-1}>
              <Button variant={'outline'} >
                <FilterIcon className="text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg w-96">
              <DialogHeader>
                <DialogTitle>Additional Filters</DialogTitle>
                <DialogDescription>
                  Narrow your search
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 ">
                <Select key="Genre" onValueChange={(newValue: string) =>  handleUpdateFilters(newValue, "name")}>
                  <SelectTrigger >
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(filters["Genre"]).map((option: string) => (
                      <SelectItem key={option} value={filters["Genre"][option]}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-4">
                  <Select key="Cost" onValueChange={(newValue: string) =>  handleUpdateFilters(parseInt(newValue), "name")}>
                    <SelectTrigger >
                      <SelectValue placeholder="Cost" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(filters["Cost"]).map((option: string) => (
                        <SelectItem key={option} value={filters["Cost"][option]}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select key="Size" onValueChange={(newValue: string) =>  handleUpdateFilters(parseInt(newValue), "name")}>
                    <SelectTrigger >
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(filters["Size"]).map((option: string) => (
                        <SelectItem key={option} value={filters["Size"][option]}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Checkbox id="inactive" onCheckedChange={(checked) => console.log(checked)} />
                <label
                  htmlFor="inactive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show inactive clubs
                </label>
              </div>
              <DialogFooter>
                <Button onClick={resetFilters} variant='outline'>
                  Reset
                </Button>
                <DialogClose asChild>
                  <Button type='submit' variant='secondary' >
                    Apply
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Input
              className="w-[80%] border-muted bg-background text-muted-foreground px-5"
              placeholder="Search for a club"
              onChange={(e) => handleUpdateFilters(e.target.value, "name")}
            />

          <Button type="submit" variant='secondary' className="text-accent-foreground">
            <ViewportWrapper breakpoint="large">
              Search
            </ViewportWrapper>
            <ViewportWrapper breakpoint="mobile">
              <Search />
            </ViewportWrapper>
          </Button>
        </form> */}