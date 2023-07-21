'use client';

import Select from 'react-select'
import useCities from '@/app/hooks/useCities'; // make sure you updated this import

export type CitySelectValue = {
  value:string; // city name
  label:string;
  province: string; // province name
};

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { formattedCities } = useCities();
  const options: CitySelectValue[] = formattedCities?.map(city => ({
    value: city.city + ', ' + city.province,
    label: city.city + ', ' + city.province,
    province: city.province,
  })) || [];

  return ( 
    <div>
      <Select
        placeholder="Choose your city"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>
              {option.label}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 
export default CitySelect;
