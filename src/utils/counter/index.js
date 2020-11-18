import MCounterFactory from './MCounter'
import { VERSION } from './Default'
const MCounter = (option) => {
  if (!window.MV) {
    window.MV = Object.create(null)
  }
  if (!window.MV.MC) {
    window.MV.MC = Object.create(null)
    window.MV.MC.v = VERSION
  }
  return new MCounterFactory(option)
}
export function MCo (o) {
  MCounter(o)
}
