import { DetailedHTMLProps, FC, forwardRef, HTMLAttributes } from "react"

export interface IconProps extends DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> {
  name: string
  section?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { name, section = "icons", ...other } = props

  return (
    <svg ref={ref} {...other} data-testid="icon_svg">
      <use
        data-testid="icon_svg_use"
        xlinkHref={`/sprites/${section}.svg#${name.toLocaleLowerCase()}`}
      />
    </svg>
  )
})
