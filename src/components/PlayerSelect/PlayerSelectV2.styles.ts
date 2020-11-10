import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useTextFieldStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export const useSearchResultContainerStyles = makeStyles({
  root: {
    width: '60%',
    position: 'absolute',
    zIndex: 2,
    '& .LazyLoad' : {
      borderBottom: '1px solid lightgray',
      whiteSpace: 'nowrap'
    } ,
    ...getScrollBarStyles('.resultsList')
  }
});

export const useListStyles = makeStyles({
  root: (isFocused) => {
    return {
      height: isFocused ? 200 : 0,
      transitionDuration: '.2s',

    }
  },
})