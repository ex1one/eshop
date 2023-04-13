import clsx from "clsx"
import { m } from "framer-motion"
import { ReactNode, useState } from "react"
import { AccordionContent, AccordionToggle } from "./components/"

export interface AccordionItemProps {
  title: ReactNode
  content: ReactNode
  className?: string
  contentClassName?: string
}

export const AccordionItem = ({
  content,
  contentClassName,
  className,
  title,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => setIsOpen((prev) => !prev)

  return (
    <m.div transition={{ duration: 0.4 }} className={clsx(className, isOpen && "bg-transparent")}>
      <AccordionToggle onToggle={onToggle} title={title} isOpen={isOpen} />
      <AccordionContent contentClassName={contentClassName} content={content} isOpen={isOpen} />
    </m.div>
  )
}
