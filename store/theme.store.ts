import { makeAutoObservable } from 'mobx'
import { DisciplineId } from '@/types'
import { SERVICES_CONFIG, SERVICE_KEYS } from '@/config/disciplines'

const DEFAULT_DISCIPLINE_ID: DisciplineId = 'media-production'

class ThemeStore {
  activeDisciplineId: DisciplineId = DEFAULT_DISCIPLINE_ID
  isHudVisible: boolean = true
  isSoundEnabled: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setActiveDiscipline(id: DisciplineId) {
    if (this.activeDisciplineId !== id) {
      this.activeDisciplineId = id
    }
  }

  toggleHud() {
    this.isHudVisible = !this.isHudVisible
  }

  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled
  }

  get currentDiscipline() {
    return (
      SERVICES_CONFIG[this.activeDisciplineId] ||
      SERVICES_CONFIG[DEFAULT_DISCIPLINE_ID] ||
      SERVICES_CONFIG[SERVICE_KEYS[0]]
    )
  }
}

export const themeStore = new ThemeStore()
