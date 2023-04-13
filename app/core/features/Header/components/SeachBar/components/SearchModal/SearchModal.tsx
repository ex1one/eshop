import { Popup } from "app/core/components"
import { Icon } from "app/core/UI"
import { InputSearchBar } from "../InputSearchBar"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = ({ onClose, isOpen }: SearchModalProps) => {
  return (
    <Popup overlayProps={{ className: "bg-white" }} hideCloseIcon isOpen={isOpen} onClose={onClose}>
      <div className="mx-2 my-2 flex items-center gap-2">
        <Icon onClick={onClose} name="arrow-left-fill" className="h-6 w-6" />
        <InputSearchBar onCloseSearchModal={onClose} isMobileView={true} />
      </div>
    </Popup>
  )
}
