export const getScrollBarStyles = (selector: string, scrollBarWidth?: number, height?: number | string) => {
  return {
    [`& ${selector}`]: {
      overflowY: 'scroll',
      height: height ?? 'auto'
    },
    [`& ${selector}::-webkit-scrollbar`]: {
      width: scrollBarWidth ?? 4
    },
    [`& ${selector}::-webkit-scrollbar-track`]: {
      backgroundColor: '#0004',
      borderRadius: scrollBarWidth ?? 4 / 2
    },
    [`& ${selector}::-webkit-scrollbar-thumb`]: {
      backgroundColor: '#FFFA',
      borderRadius: scrollBarWidth ?? 4 / 2
    }
  }
}