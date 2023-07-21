'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";

import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';

import Input from '../inputs/Input';
import Heading from '../Heading';
import CitySelect from '../inputs/CitySelect';
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }
const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
    let newCategories;
    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          category: [],
          location: null,
          guestCount: 1,
          roomCount: 1,
          bathroomCount: 1,
          imageSrc: '',
          price: 1,
          title: '',
          description: '',
        }
      });
       
    const category = watch('category');
    const location = watch('location');
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
      ssr: false 
    }), [location]);
    const setCustomValue = (id: string, value: any) => {
          setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
    }
    const onBack = () => {
        setStep((value) => value - 1);
      }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const handleCategoryClick = (category: string) => {
        
        if (categoriesSelected.includes(category)) {
          newCategories = categoriesSelected.filter(cat => cat !== category);
        } else {
          newCategories = [...categoriesSelected, category];
        }
        
        setCategoriesSelected(newCategories);
        setCustomValue('category', newCategories); 
        console.log(newCategories);
      }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
          return 'Create'
        }
    
        return 'Next'
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
    }, [step]);
    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick categories"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                 <CategoryInput
                    onClick={() => handleCategoryClick(item.label)}
                    selected={categoriesSelected.includes(item.label)}
                    label={item.label}
                    icon={item.icon}
                />

              </div>
            ))}
          </div>
        </div>
      )
      if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where is your place located?"
              subtitle="Help tenants find you!"
            />
            <CitySelect 
              value = {location}
              onChange={(value) => setCustomValue('location', value)} 
            />
             <Map center={location?.latlng} />
          </div>
        );
      }
    return ( 
     <Modal
      isOpen={rentModal.isOpen}
      title="Find your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={onNext}
      onClose={rentModal.onClose}
      body = {bodyContent}
    />
     );
}
 
export default RentModal;