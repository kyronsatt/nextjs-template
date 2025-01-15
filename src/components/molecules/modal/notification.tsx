import { Button } from "@/components/atoms/button";
import HeroIcon from "@/components/atoms/hero-icon";
import ModalBase, { IModalBaseProps } from "./base";

export type NotificationTypes = "SUCCESS" | "ERROR";

export interface IModalNotificationProps
  extends Omit<IModalBaseProps, "children"> {
  notificationType?: NotificationTypes;
}

const ModalNotification: React.FC<IModalNotificationProps> = ({
  title,
  subtitle,
  notificationType,
  open,
  setOpen,
}: IModalNotificationProps) => {
  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center p-8">
        <HeroIcon
          className="w-12 h-12"
          icon={
            notificationType === "SUCCESS"
              ? "CheckCircleIcon"
              : "ExclamationCircleIcon"
          }
        />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold text-center">{title}</p>
          <p className="text-sm font-light text-center">{subtitle}</p>
        </div>
        <Button
          label="Fechar"
          kind="secondary"
          className="w-full mt-4"
          onClick={() => setOpen && setOpen(false)}
        />
      </div>
    </ModalBase>
  );
};

export default ModalNotification;
