"use client";

// TODO: link to backend, and name searching, reset filters, and error handling

import { Input } from "@/components/ui/input";
import { IClub, filters } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
import ViewportWrapper from "@/components/shared/ViewportWrapper";
import { Search, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { useState } from "react";
import ClubPreviewCard from "@/components/clubs/ClubPreviewCard";
import ClubLoadingPlaceholder from "@/components/clubs/ClubLoadingPlaceholder";
import { ImageOfStudents } from "/public/images/Waterloo Students.jpg"
import clsx from "clsx";
import { useTheme } from "@/components/shared/ThemeProvider";
import ClubHubBanner from "@/components/ClubHubBanner";

const hardcodeData: Array<IClub> = [
  {
    "_id": "664c08955c58341b46c62acc",
    "name": "Ascend Canada Waterloo Chapter",
    "preview": '/images/PinnedAppLogo.png',
    "overview": "This is the short extract that you will be able to see in the directory. This is a filler sentence!!",
    "genre": "Sports",
    "cost": 0,
    "size": 100,
    "colorTheme": "#007bff",
  },
  {
    "_id": "66441aa4ccfc04b318c6b662",
    "name": "Pinned",
    "logo": '/images/PinnedAppLogo.png',
    "overview": "This is the short extract that you will be able to see in the directory. This is a filler sentence!!",
    "genre": "Music",
    "cost": 10,
    "size": 50,
    "colorTheme": "#DC3545",
  },
  {
    "_id": "664ea3da37ce17ab6273b2f7",
    "name": "Pinned",
    "logo": '/images/flowchart.png',
    "overview": "This is the short extract that you will be able to see in the directory.",
    "genre": "Sports",
    "cost": 15,
    "size": 10,
    "colorTheme": "#FFC107",
  },
  {
    "_id": "664ebd77f062c321270e58de",
    "name": "Pinned",
    "overview": "This is the short extract that you will be able to see in the directory.",
    "genre": "Charity & Community Service",
    "cost": 60,
    "size": 30,
    "colorTheme": "#28A745",
  },
  {
    "_id": "66441bb1e6c53af82cf6e7ba",
    "name": "Test Club",
    "overview": "This is the short extract that you will be able to see in the directory.",
    "genre": "Music",
    "cost": 50,
    "size": 20,
    "colorTheme": "#6610F2",
  }
]


const FetchClubs = ({ name, genre, cost, size}: FiltersType) => {
  return axios.get(`http://localhost:8080/api/clubs/?name=${name}&genre=${genre}&cost=${cost}&size=${size}`);
}

const ClubHub = () => {
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [cost, setCost] = useState<number>(-1);
  const [size, setSize] = useState<number>(-1);

  const [fetching, setFetching] = useState<boolean>(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);
  //const queryClient = useQueryClient(); // can be used for certain things, not too sure if will be needed
  const { theme } = useTheme();
  
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

  return (
    <section className="inline-flex flex-col items-center w-full h-full pb-4 bg-slate-5 dark:bg-slate-950">
      <ClubHubBanner />

      <section className="flex flex-wrap justify-center p-4 px-4 mt-10 mb-5 space-y-4 dark:bg-slate-950 lg:px-16 max-w-[80rem] w-full">
        <form className="flex items-center justify-center w-full space-x-2" onSubmit={(e) => handleSubmit(e)}>
          <Input
            className="w-[80%] bg-white border-slate-500 dark:bg-slate-950 dark:text-gray-500 px-5"
            placeholder="Search for a club"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button type="submit" variant='secondary' className=" text-gray-200">
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
              <div className="flex text-gray-500">
                Additional Filters { isCollapsibleOpen ? <ChevronUp /> : <ChevronDown /> }
              </div>
            <div className="w-[100%] h-1 border-2 border-solid bg-slate-500 border-slate-500 rounded-full mt-1 "></div>
            </CollapsibleTrigger>
          </div>
            
          
          <CollapsibleContent className={clsx("rounded-b-md px-2 pt-1 pb-4 shadow-md shadow-slate-200 dark:shadow-slate-800 transition-all duration-1000 overflow-hidden")}>
            {isCollapsibleOpen && 
              <div className="flex gap-1 hover:cursor-pointer text-gray-500" onClick={resetFilters}>
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

      <section className=" flex min-h-[30rem] justify-center py-4 px-4 lg:px-16 max-w-[90rem]">
        {false && 
          <div className="flex flex-wrap w-full gap-10 justify-evenly">
            <ClubLoadingPlaceholder />
            <ClubLoadingPlaceholder />
            <ClubLoadingPlaceholder />
            <ClubLoadingPlaceholder />
            <ClubLoadingPlaceholder />
            <ClubLoadingPlaceholder />
          </div>
        }
        {isError && <h1 className="mt-20 text-3xl font-medium text-gray-500">Error fetching clubs</h1>}
        {data && 
        <div className="flex flex-wrap justify-center w-full gap-10 sm:justify-start">
          {hardcodeData.map((club: IClub) => (
            <ClubPreviewCard club={club} key={club._id}/>
          ))}
          {/* {data.data.map((club: IClub) => (
            <ClubPreviewCard club={club} />
          ))} */}
          {data.data.map((club: IClub) => (
            <ClubPreviewCard club={club} />
          ))}
        </div>
        }
      </section>
    </section>
  )
}

export default ClubHub;
