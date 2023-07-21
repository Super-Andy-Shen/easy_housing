'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { FaPeoplePulling,
        FaPeopleGroup ,
        FaPersonWalkingLuggage,
        FaPeopleCarryBox,
        FaPeopleRoof,
        FaBaby,
        FaCarRear,
        FaCat,
        FaPlaneArrival,
        FaRestroom} from "react-icons/fa6";
import { MdFamilyRestroom } from 'react-icons/md';

import CategoryBox from '../Categorybox' 
import Container from '../Container';
import { AiFillBank } from "react-icons/ai";

export const categories = [
  {
    label: 'One',
    icon: FaPersonWalkingLuggage,
    description: '',
  },
  {
    label: 'Two',
    icon: FaPeoplePulling ,
    description: ''
  },
  {
    label: 'Group >= 3',
    icon: FaPeopleRoof,
    description: ''
  },

  {
    label: 'Couple',
    icon: FaPeopleCarryBox,
    description: ''
  },
  {
    label: 'Family',
    icon: MdFamilyRestroom,
    description: ''
  },

  {
    label: 'Newcomer',
    icon: FaPlaneArrival,
    description: ''
  },
  {
    label: 'Bad/No Credit',
    icon: AiFillBank,
    description: ''
  },
  {
    label: 'With Baby',
    icon: FaBaby,
    description: ''
  },
  {
    label: 'With Pet',
    icon: FaCat,
    description: ''
  },
  {
    label: 'With Car',
    icon: FaCarRear,
    description: ''
  },
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;