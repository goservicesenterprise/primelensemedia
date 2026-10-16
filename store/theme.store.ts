import { makeAutoObservable } from 'mobx'
import { DisciplineId } from '@/types'
import { DISCIPLINES } from '@/config/disciplines'

class ThemeStore {
  activeDisciplineId: DisciplineId = 'filmmaking'
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
    return DISCIPLINES[this.activeDisciplineId] || DISCIPLINES.filmmaking
  }
}

export const themeStore = new ThemeStore()
