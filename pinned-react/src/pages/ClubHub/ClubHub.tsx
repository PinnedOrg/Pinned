"use client";

import { Input } from "@/components/ui/input";
import { IClub } from "@/lib/types";
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
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";


type FiltersType = {
  genre: string,
  isActive: boolean,
  size: number,
  cost: number
}

const filters: Record<string, Record<string, string>> = {
  "Genre": {
    "Academic": "acaedemic",
    "Business & Entrepreneurship": "b&e",
    "Charity & Community Service": "charity",
    "Arts": "arts",
    "Culture": "cultural",
    "Environment & Sustainability": "env",
    "Games & Social": "g&s",
    "Health & Well Being": "health",
    "Politics & Social Awareness": "political",
    "Sports": "sports",
    "Design Team": "designteam",
    "Media Literacy": "media",
    "Religion & Spirituality": "religion"
  },
  "Cost": {
    "Free": "0",
    "Under $10": "10",
    "$10 - $50": "50",
    "$50 - $100": "100",
    "Over $100": "101"
  }, 
  "Size": {
    "Under 20": "20",
    "20 to 50": "50",
    "50 to 100": "100",
    "Over 100": "101"
  }
}

const FetchClubs = () => {
  return axios.get("http://localhost:8080/api/clubs")
}

const ClubHub = () => {
  const [genre, setGenre] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);
  //const queryClient = useQueryClient();

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

  // fetch clubs from database
  const {isPending, isError, data, error } = useQuery({
    queryKey: ["Clubs"],
    queryFn: FetchClubs
  })

  if (isPending) {
    // return ( <h1>Loading...</h1>)
  }  
  // if (isError) {
  //   return ( <h1>{error.message}</h1>)
  // }

  return (
    <section className="w-full h-screen p-4 bg-gray-50">
      <div className="mt-4 text-center">
        <h1 className="font-bold text-5xl tracking-wide text-gray-800 mb-5">
          The Club Hub{/*<span className="bg-primary py-1 px-2 rounded-lg">Hub</span>*/}
        </h1>
        <p className="text-lg text-gray-500">Find all the clubs and organizations UWaterloo has to offer!</p>
      </div>

      <section className="my-10 mx-20 flex flex-wrap justify-center bg-gray-300 p-4 rounded-md space-y-4">
        <div className="flex w-full justify-center items-center space-x-2">
          <Input
            className="w-[60%] bg-white border-2  px-5"
            placeholder="Search for a club"
          />
          <Button type="submit" className="hover:bg-primary-hover">
            <ViewportWrapper breakpoint="large">
              Search
            </ViewportWrapper>
            <ViewportWrapper breakpoint="mobile">
              <Search />
            </ViewportWrapper>
          </Button>
        </div>

        <Collapsible className="w-full">
          <CollapsibleTrigger 
            className="flex"
            onClick={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
          >
          {/* " ▼" : " ▲"  */}
            Additional Filters { isCollapsibleOpen ?  <ChevronDown /> : <ChevronUp /> }
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="w-[100%] h-1 border-2 border-solid border-primary rounded-full mt-1 mb-2"></div>
            <div className="flex flex-wrap justify-center lg:justify-evenly lg:gap-x-[4rem] gap-y-2 w-full">
              { Object.keys(filters).map((filter: string) => (
                <Select 
                  key={filter} 
                  onValueChange={(newValue: string) => updateFilters(newValue, filter)}>
                  <SelectTrigger className=" min-w-[6rem] max-w-[18rem]">
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
    </section>
  )
}

export default ClubHub;
