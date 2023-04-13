import { Popup } from "app/core/components"

interface LoaderProps {
  isShow: boolean
}

export const Loader = ({ isShow }: LoaderProps) => {
  return (
    <Popup overlayProps={{ className: "bg-white opacity-40" }} hideCloseIcon isOpen={isShow}>
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-[6px] border-solid border-red-600 border-t-slate-200 duration-500" />
      </div>
    </Popup>
  )
}
