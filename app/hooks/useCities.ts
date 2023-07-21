'use client'
import { useEffect, useState } from 'react';
var canada = require('canada');

interface ICity {
  city: string;
  province: string;
}
const useCities = () => {
  const [formattedCities, setFormattedCities] = useState<ICity[]>([])
  useEffect(() => {
    const cities = canada.cities.map((cityData: [string, string]) => {
      return {
        city: cityData[0],
        province: cityData[1],
      };
    });
    setFormattedCities(cities);
  }, []);

  return { formattedCities};
};
export default useCities;
