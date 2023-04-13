import { AnimatePresence, m } from "framer-motion"
import { AccordionItemProps } from "../AccordionItem"

interface AccordionContentProps extends Partial<AccordionItemProps> {
  isOpen: boolean
}

export const AccordionContent = ({ content, contentClassName, isOpen }: AccordionContentProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className={contentClassName}
        >
          {content}
        </m.div>
      )}
    </AnimatePresence>
  )
}
