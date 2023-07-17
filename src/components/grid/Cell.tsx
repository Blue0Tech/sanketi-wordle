import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import "../../Stylesheet.css";
import { solution } from '../../lib/words';

type Props = {
  value?: string
  status?: CharStatus
  swaraStatus?: CharStatus
}

export const Cell = ({ value, status, swaraStatus }: Props) => {
    if(swaraStatus !== 'correct')
    {
        swaraStatus = status
    }

    var isPlaceholder = (solution=="ಕಕಕಕಕ" || solution=="ಕಕಕಕ" || solution=="ಕಕಕ");

  const classes = classnames(
    'w-14 h-14 border-solid border-4 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white': !status,
      'bg-slate-400 text-white': status === 'absent' || (isPlaceholder && status),
      'bg-green-500 text-white': status === 'correct' && !isPlaceholder,
      'bg-yellow-500 text-white': status === 'present' && !isPlaceholder,
      'bg-blue-500 text-white': status === 'inplace' && !isPlaceholder,
    },
      {
          'border-white-200': !swaraStatus,
          'border-slate-400': swaraStatus === 'absent' || (isPlaceholder && swaraStatus),
          'border-green-500': swaraStatus === 'correct' && !isPlaceholder,
          'border-yellow-500': swaraStatus === 'present' && !isPlaceholder,
          'border-blue-500': swaraStatus === 'inplace' && !isPlaceholder,
      }
  )

  return (
    <>
      <div style={{fontFamily:"Sanketi"}} className={classes}>{value}</div>
    </>
  )
}
