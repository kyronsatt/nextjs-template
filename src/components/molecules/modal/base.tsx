import React from "react";

export interface IModalBaseProps {
  title?: string;
  subtitle?: string;
  children: JSX.Element;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const ModalBase: React.FC<IModalBaseProps> = ({
  children,
  open,
  setOpen,
}: IModalBaseProps) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-expect-error -> never types conflict
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen && setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  if (open) {
    return (
      <div
        id="popup-modal"
        className="fixed flex items-center justify-center top-0 left-0 z-[200] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full w-full backdrop-blur-sm bg-black bg-opacity-30"
      >
        <div className="relative w-4/5 lg:w-2/5 max-h-full">
          <div
            ref={modalRef}
            className="bg-light-1 rounded-default shadow-2xl text-dark-1"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalBase;
