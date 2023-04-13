import { FC, ReactNode, useRef } from "react"
import { useHover } from "app/core/hooks"

import s from "./ToolTip.module.css"
import clsx from "clsx"

interface ToolTipProps {
  placement?: "left" | "right" | "top" | "bottom"
  children: ReactNode
  title: ReactNode
  arrow?: boolean
  className?: string
}

export const Tooltip: FC<ToolTipProps> = ({
  placement = "top",
  children,
  title,
  className,
  arrow = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isHoverElement = useHover<HTMLDivElement>(ref)

  return (
    <div ref={ref} className={s.container}>
      {isHoverElement && (
        <div className={clsx(s.tooltip_container, s[`position_${placement}`], className)}>
          {arrow && <div className={clsx(s[`position_${placement}_pointer`], s.pointer)} />}
          {title}
        </div>
      )}

      {children}
    </div>
  )
}
