"use client";

import HeroIcon from "@/components/atoms/hero-icon";
import ModalBase, { IModalBaseProps } from "./base";

const ModalDefault: React.FC<IModalBaseProps> = ({
  title,
  children,
  open,
  setOpen,
}: IModalBaseProps) => {
  return (
    <ModalBase open={open}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center pb-4 border-b-1 border-white border-opacity-10">
          <p className="text-paragraph-medium font-semibold">{title}</p>
          <button onClick={() => setOpen && setOpen(false)}>
            <HeroIcon icon="XMarkIcon" />
          </button>
        </div>
        {children}
      </div>
    </ModalBase>
  );
};

export default ModalDefault;
