import type { SandboxGamePosition } from '@ih3t/shared'

export interface SandboxRouteInitialPosition {
  name: string
  gamePosition: SandboxGamePosition
}

export interface SandboxRouteState {
  initialPosition?: SandboxRouteInitialPosition
}
