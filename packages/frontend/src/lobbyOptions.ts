import type { LobbyTimeControl } from '@ih3t/shared'

function formatSeconds(totalSeconds: number) {
  if (totalSeconds % 60 === 0) {
    const minutes = totalSeconds / 60
    return `${minutes}m`
  }

  return `${totalSeconds}s`
}

export function formatTimeControl(timeControl: LobbyTimeControl) {
  if (timeControl.mode === 'unlimited') {
    return 'Unlimited'
  }

  if (timeControl.mode === 'turn') {
    return `Turn ${formatSeconds(Math.round(timeControl.turnTimeMs / 1000))}`
  }

  return `Match ${formatSeconds(Math.round(timeControl.mainTimeMs / 1000))} +${formatSeconds(Math.round(timeControl.incrementMs / 1000))}`
}

export function formatTimeControlDescription(timeControl: LobbyTimeControl) {
  if (timeControl.mode === 'unlimited') {
    return 'No clock is configured for this lobby.'
  }

  if (timeControl.mode === 'turn') {
    return `Each turn is configured for ${formatSeconds(Math.round(timeControl.turnTimeMs / 1000))}.`
  }

  return `Each player is configured for ${formatSeconds(Math.round(timeControl.mainTimeMs / 1000))} with a ${formatSeconds(Math.round(timeControl.incrementMs / 1000))} increment.`
}
