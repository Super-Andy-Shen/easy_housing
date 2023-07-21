'use client'
import {AiFillEdit} from 'react-icons/ai';
import Avatar from '../Avatar';
import {useCallback, useState} from 'react'
import MenuItem from "./MenuItem";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import {SafeUser} from "@/app/types";
import { useRouter } from 'next/navigation';
import useRentModal from '@/app/hooks/useRentModal';
interface UserMenuProps{
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const[isOpen,setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[]);
    const onRent = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      rentModal.onOpen();
    }, [currentUser,loginModal,rentModal]);
    return (  
         <div className="relative">
             <div className="flex flex-row items-center gap-3">
                 <div
                   onClick={onRent}
                   className ="
                     hidden
                     md:block
                     text-sm
                     font-semibold
                     py-3
                     px-4
                     rounded-full
                     hover:bg-neutral-100 
                     transition
                     cursor-pointer
                   "
                 >
                    Student Housing Expert
                 </div>
                 <div
                    onClick={toggleOpen}
                    className ="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                 >
                     <AiFillEdit/>
                     <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                     </div>
                 </div>
             </div>
             {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser? (
                <>
                  <MenuItem  
                    onClick ={()=>{}}
                    label = "My profile"
                  />
                  <MenuItem  
                    onClick={()=>{}}
                    label = "My favorites"
                  />
                  <MenuItem  
                    onClick ={()=>{}}
                    label = "History"
                  />
                  <MenuItem  
                    onClick ={rentModal.onOpen}
                    label = "Student Housing Expert"
                  />
                  <hr/>
                  <MenuItem  
                    onClick ={() => router.push('/help')}
                    label = "Help"
                  />
                  <MenuItem  
                    onClick ={() => signOut()}
                    label = "Logout"
                  />
                  
                </>
            ):(
                <>
                  <MenuItem  
                    onClick={loginModal.onOpen}
                    label = "Login"
                  />
                  <MenuItem  
                    onClick ={registerModal.onOpen}
                    label = "Sign up"
                  />
                  <MenuItem  
                    onClick ={() => router.push('/help')}
                    label = "Help"
                  />
                </>
            )}
          </div>
        </div>
      )}
         </div>
    );
}
 
export default UserMenu;