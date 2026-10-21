import { makeAutoObservable } from 'mobx'
import { DisciplineId } from '@/types'
import { SERVICES_CONFIG, SERVICE_KEYS } from '@/config/disciplines'

const DEFAULT_DISCIPLINE_ID: DisciplineId = 'media-production'

class ConsultationStore {
  isOpen: boolean = false
  selectedDisciplineId: DisciplineId = DEFAULT_DISCIPLINE_ID

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
    return (
      SERVICES_CONFIG[this.selectedDisciplineId] ||
      SERVICES_CONFIG[DEFAULT_DISCIPLINE_ID] ||
      SERVICES_CONFIG[SERVICE_KEYS[0]]
    )
  }
}

export const consultationStore = new ConsultationStore()
