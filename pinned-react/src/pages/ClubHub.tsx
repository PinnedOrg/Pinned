import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { IClub } from "@/lib/types";
import { filters } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


import { Button } from "@/components/ui/button";

import { IClub } from "@/lib/types";
import { filters } from "@/lib/data";
import { axiosInstance } from "@/lib/utils";

import ViewportWrapper from "@/components/shared/ViewportWrapper";
import ClubPreviewCard from "@/components/cards/ClubPreviewCard";
import ClubLoadingPlaceholder from "@/components/cards/ClubLoadingPlaceholder";
import ClubHubBanner from "@/components/clubhub/clubhubbanner";
import { axiosInstance } from "@/lib/utils";

import { Search, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import PageErrorMessage from "@/components/error/PageErrorMessage";
import ClubNotFoundErrorMessage from "@/components/error/ClubNotFoundErrorMessage";
import GradientBackground from "@/components/shared/gradientbackground";

type FiltersType = {
  name: string,
  genre: string,
  cost: number,
  size: number,
}

const FetchClubs = ({ name, genre, cost, size}: FiltersType) => {
  return axiosInstance.get(`http://localhost:8080/api/clubs/?name=${name}&genre=${genre}&cost=${cost}&size=${size}`);
}

const ClubHub = () => {
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [cost, setCost] = useState<number>(-1);
  const [size, setSize] = useState<number>(-1);

  const [fetching, setFetching] = useState<boolean>(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);
  //const queryClient = useQueryClient(); // can be used for certain things, not too sure if will be needed
  
  const updateFilters = (newValue: string, filter: string) => {
    switch (filter) {
      case "Genre":
        setGenre(newValue);
        console.log(newValue);
        break;
      case "Cost":
        setCost(parseInt(newValue));
        console.log(newValue);
        break;
      case "Size":
        setSize(parseInt(newValue));
        console.log(newValue);
        break;
    }
  }

  const resetFilters = () => {
    location.reload(); // refresh page, auto resets filters
  }

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // prevent page refresh
    setFetching(!fetching); // trigger a data fetch
  }
  // fetch clubs from database
  const {isFetching, isError, data } = useQuery({
    queryKey: ["Clubs", fetching], // query refreshes when this value changes
    queryFn: () => FetchClubs({name, genre, cost, size}),
  });

  console.log(data);
  return (
    <section className="inline-flex flex-col items-center w-full h-full pb-4 bg-slate-5">
      {/* <GradientBackground /> */}
      <ClubHubBanner />

      <section className="container flex flex-wrap justify-center p-4 px-4 mt-10 mb-5 space-y-4 bg-transparent lg:px-16 max-w-[80rem] w-full">
        <form className="flex items-center justify-center w-full space-x-2" onSubmit={(e) => handleSubmit(e)}>
          <Input
            className="w-[80%] border-muted-foreground bg-background text-muted-foreground px-5"
            placeholder="Search for a club"
            onChange={(e) => {
              setName(e.target.value);
            }}
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
              <div className="flex text-muted-foreground">
                Additional Filters { isCollapsibleOpen ? <ChevronUp /> : <ChevronDown /> }
              </div>
            <hr className="w-[100%] border border-solid border-slate-500 rounded-full mt-1 "></hr>
            </CollapsibleTrigger>
          </div>
            
          
          <CollapsibleContent className={clsx("rounded-b-md px-2 pt-1 pb-4 shadow-md shadow-slate-200 dark:shadow-slate-800 transition-all duration-1000 overflow-hidden")}>
            {isCollapsibleOpen && 
              <div className="flex gap-1 text-muted-foreground hover:cursor-pointer" onClick={resetFilters}>
                Reset
                <RotateCcw className="w-[1rem] h-auto " />
              </div>
            }
            <div className="mt-2 flex flex-wrap justify-center lg:justify-evenly lg:gap-x-[4rem] gap-y-2 w-full">
              { Object.keys(filters).map((filter: string) => (
                <Select 
                  key={filter} 
                  onValueChange={(newValue: string) => updateFilters(newValue, filter)}>
                  <SelectTrigger className=" min-w-[6rem] max-w-[18rem] border-slate-500">
                    <SelectValue placeholder={filter} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(filters[filter]).map((option: string) => (
                      <SelectItem key={option} value={filters[filter][option]}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section className="container flex min-h-[30rem] justify-center bg-transparent">
        {(isError || (data?.data.length === 0)) ? (
          <div className="mt-20">
            {isError ? (
              <PageErrorMessage />
            ) : (
              <ClubNotFoundErrorMessage />
            )}
            {isError ? (
              <PageErrorMessage />
            ) : (
              <ClubNotFoundErrorMessage />
            )}
          </div>
        ) : (
          <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {"gap-6": data})}>
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
    </section>
  )
}

export default ClubHub;
