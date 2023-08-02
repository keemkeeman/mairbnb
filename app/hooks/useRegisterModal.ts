import { create } from "zustand";

interface ResisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/* zustand의 create 함수로 상태를 생성 */
/* set 은 상태 업데이트 하는 함수 */
const useRegisterModal = create<ResisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
