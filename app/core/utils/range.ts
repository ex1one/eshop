export const range = (start, end): number[] => {
  let length = end - start

  return Array.from({ length }, (_, idx) => idx + start)
}
