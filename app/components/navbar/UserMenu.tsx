"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avarta from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-1">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 trasition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border=[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md trasition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avarta src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          {currentUser ? (
            <>
              <MenuItem onClink={() => router.push("/trips")} label="My trip" />
              <MenuItem
                onClink={() => router.push("/favorites")}
                label="My favorites"
              />
              <MenuItem
                onClink={() => router.push("/reservations")}
                label="My reservation"
              />
              <MenuItem
                onClink={() => router.push("/properties")}
                label="My properties"
              />
              <MenuItem onClink={rentModal.onOpen} label="Airbnb my home" />
              <hr /> {/* 수평선 태그 */}
              <MenuItem onClink={() => signOut()} label="Log out" />
            </>
          ) : (
            <>
              <MenuItem onClink={loginModal.onOpen} label="Login" />
              <MenuItem onClink={registerModal.onOpen} label="Sign up" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
