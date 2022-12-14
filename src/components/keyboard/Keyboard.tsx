import { KeyValue } from '../../lib/keyboard'
import {getStatuses, enToKnMap, enToKnVowelMap, vowelToVowelMap} from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onShift: () => void
  shiftPressed: boolean
  guesses: string[]
  currentGuess: string
}

export const Keyboard = ({ onChar, onDelete, onEnter, onShift, shiftPressed, guesses, currentGuess }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    }else if (value === 'SHIFT') {
      onShift()
    }else {
      if(!(currentGuess.length===0))
      {
        value = vowelToVowelMap.has(value)?vowelToVowelMap.get(value) : value
      }
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight')) {
        onShift()
      } else {
        const key = e.key
        if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z")) {
          if(currentGuess.length===0) {
            if(enToKnVowelMap.has(e.key)) {
              onChar(enToKnVowelMap.get(e.key))
              return
            }
            onChar(enToKnMap.get(e.key))
          }
          else {
            onChar(enToKnMap.get(e.key))
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, onShift, guesses, currentGuess])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight')) {
        onShift()
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [onShift])
  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"}  onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???": "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???": "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
        <Key value={shiftPressed ? "???" : "???"} onClick={onClick} status={charStatuses[shiftPressed ? "???" : "???"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key width={65.4} value="SHIFT" onClick={onClick} status={shiftPressed?'absent':undefined}>
          Shift
        </Key>
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "??????":"??????"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key width={65.4} value="SHIFT" onClick={onClick} status={shiftPressed?'absent':undefined}>
          Shift
        </Key>
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key value={shiftPressed ? "???":"???"} onClick={onClick} status={charStatuses[shiftPressed ? "???":"???"]} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
