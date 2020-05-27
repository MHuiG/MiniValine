import MCounterFactory from './MCounter'
import { VERSION } from './Default'
const MCounter = (option) => {
  if (!window.MV) {
    window.MV = {}
  }
  if (!window.MV.MC) {
    window.MV.MC = {}
    window.MV.MC.v = VERSION
  }
  return new MCounterFactory(option)
}
export function MCo (o) {
  MCounter(o)
}
