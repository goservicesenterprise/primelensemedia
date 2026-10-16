import { makeAutoObservable } from 'mobx'
import { DisciplineId } from '@/types'
import { DISCIPLINES } from '@/config/disciplines'

class ConsultationStore {
  isOpen: boolean = false
  selectedDisciplineId: DisciplineId = 'filmmaking'

  constructor() {
    makeAutoObservable(this)
  }

  open(disciplineId?: DisciplineId) {
    if (disciplineId) {
      this.selectedDisciplineId = disciplineId
    }
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  setSelectedDiscipline(id: DisciplineId) {
    this.selectedDisciplineId = id
  }

  get activeConfig() {
    return DISCIPLINES[this.selectedDisciplineId] || DISCIPLINES.filmmaking
  }
}

export const consultationStore = new ConsultationStore()
