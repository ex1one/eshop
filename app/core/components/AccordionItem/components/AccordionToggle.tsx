import { ReactNode } from "react"
import { AnimatePresence, m } from "framer-motion"
import { Icon } from "app/core/UI"

interface AccordionToggleProps {
  onToggle: () => void
  isOpen: boolean
  title: ReactNode
}

export const AccordionToggle = ({ onToggle, title, isOpen }: AccordionToggleProps) => {
  return (
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="rounded-inherit flex w-full items-center justify-between border-inherit bg-inherit text-left uppercase outline-none"
      type="button"
    >
      {title}
      <AnimatePresence initial={false} mode="wait">
        <m.div
          key={isOpen ? "minus" : "plus"}
          initial={{
            rotate: isOpen ? -90 : 90,
          }}
          animate={{
            rotate: 0,
            transition: {
              type: "tween",
              duration: 0.15,
              ease: "circOut",
            },
          }}
          exit={{
            rotate: isOpen ? -90 : 90,
            transition: {
              type: "tween",
              duration: 0.15,
              ease: "circIn",
            },
          }}
        >
          <Icon className="h-5 w-5" name={isOpen ? "dash" : "plus"} />
        </m.div>
      </AnimatePresence>
    </button>
  )
}
