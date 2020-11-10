export const getScrollBarStyles = (selector: string, width: number = 4) => {
  return {
    [`& ${selector}`]: {
      overflowX: 'hidden',
      overflowY: 'scroll'
    },
    [`& ${selector}::-webkit-scrollbar`]: {
      width: width
    },
    [`& ${selector}::-webkit-scrollbar-track`]: {
      backgroundColor: '#0004',
      borderRadius: width / 2
    },
    [`& ${selector}::-webkit-scrollbar-thumb`]: {
      backgroundColor: '#FFFA',
      borderRadius: width / 2
    }
  }
}