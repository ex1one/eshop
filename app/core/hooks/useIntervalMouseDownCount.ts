import { useEffect, useRef, MouseEvent } from "react"

export const useIntervalMouseDownCount = <T extends HTMLElement>(
  delay: number,
  callback: (currentTarget: DOMStringMap) => void
) => {
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const startCounter = (event: MouseEvent<T>) => {
    const currentTarget: DOMStringMap = event.currentTarget.dataset

    callback(currentTarget)

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        callback(currentTarget)
      }, delay)
    }
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => stopCounter()
  }, [])

  return { stopCounter, startCounter }
}
