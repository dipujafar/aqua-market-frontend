import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";

export default function CountryStateCitySelector({
  control,
  userAddress,
  setValue,
}: any) {
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    userAddress?.country || "United States" // Default country set to "United States"
  );
  const [selectedState, setSelectedState] = useState<string>(
    userAddress?.state || ""
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    userAddress?.city || ""
  );

  const [statesOfCountry, setStatesOfCountry] = useState<any>([]);
  const [citiesOfState, setCitiesOfState] = useState<any>([]);

  // -------- Get all data ------------- //
  useEffect(() => {
    fetch("/data/countries-states-cities.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  // -------- Sync default values when userAddress is available -------- //
  useEffect(() => {
    if (userAddress) {
      setSelectedCountry(userAddress.country || "United States");
      setSelectedState(userAddress.state || "");
      setSelectedCity(userAddress.city || "");
      setValue("country", userAddress.country || "United States");
      setValue("state", userAddress.state || "");
      setValue("city", userAddress.city || "");
    }
  }, [userAddress, setValue]);

  // -------- Keep data memoized to load once ------------ //
  const memoizedAllCountries = useMemo<any>(() => allData, [allData]);

  // -------- Load states of selected country -------- //
  useEffect(() => {
    if (selectedCountry) {
      const countryData = memoizedAllCountries?.find((country: any) => {
        return selectedCountry === country.name;
      });
      setStatesOfCountry(countryData?.states || []);
      setSelectedState(""); // Reset state when country changes
      setSelectedCity(""); // Reset city when country changes
    }
  }, [selectedCountry, memoizedAllCountries]);

  // ----------- Load cities of selected state ------- //
  useEffect(() => {
    if (selectedState) {
      const stateData = statesOfCountry?.find(
        (state: any) => state.name === selectedState
      );
      setCitiesOfState(stateData?.cities || []);
      setSelectedCity(""); // Reset city when state changes
    }
  }, [selectedState, statesOfCountry]);

  return (
    <div className="space-y-3">
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-4">
        <div>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(countryName) => {
                  field.onChange(countryName);
                  setSelectedCountry(countryName);
                }}
                value={selectedCountry || "United States"} // Default to "United States"
              >
                <SelectTrigger className="py-5 bg-primary-light-gray w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {memoizedAllCountries?.map((country: any) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          {selectedCountry ? (
            <>
              {statesOfCountry?.length ? (
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(stateName) => {
                        field.onChange(stateName);
                        setSelectedState(stateName);
                      }}
                      value={selectedState || ""}
                    >
                      <SelectTrigger className="py-5 bg-primary-light-gray w-full">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {statesOfCountry?.map((state: any) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                <Select>
                  <SelectTrigger className="py-5 bg-primary-light-gray w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no state found">
                      No state found!
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </>
          ) : (
            <Select>
              <SelectTrigger
                disabled
                className="py-5 bg-primary-light-gray w-full"
              >
                <SelectValue placeholder="Select a country first" />
              </SelectTrigger>
            </Select>
          )}
        </div>

        <div>
          {selectedState ? (
            <>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <>
                    {citiesOfState?.length ? (
                      <Select
                        onValueChange={(cityName) => {
                          field.onChange(cityName);
                          setSelectedCity(cityName);
                        }}
                        value={selectedCity || ""}
                      >
                        <SelectTrigger className="py-5 bg-primary-light-gray w-full">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {citiesOfState?.map((city: any) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="py-5 bg-primary-light-gray w-full">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No city found">
                            No city found
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </>
                )}
              />
            </>
          ) : (
            <Select>
              <SelectTrigger
                disabled
                className="py-5 bg-primary-light-gray w-full"
              >
                <SelectValue placeholder="Select a state first" />
              </SelectTrigger>
            </Select>
          )}
        </div>

        <div>
          <FormField
            control={control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your zip code"
                    {...field}
                    className="py-5 border-[#fff]/80 text-white placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
