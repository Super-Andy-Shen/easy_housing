'use client'
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
import { categories } from '../navbar/Categories';
import Input from '../inputs/Input';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
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
        let newCategories;
        
        if (categoriesSelected.includes(category)) {
          newCategories = categoriesSelected.filter(cat => cat !== category);
        } else {
          newCategories = [...categoriesSelected, category];
        }
        
        setCategoriesSelected(newCategories);
        setCustomValue('category', newCategories); // changed 'categories' to 'category'
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
    return ( 
     <Modal
      isOpen={rentModal.isOpen}
      title="Find your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={rentModal.onClose}
      onClose={rentModal.onClose}
      body = {bodyContent}
    />
     );
}
 
export default RentModal;