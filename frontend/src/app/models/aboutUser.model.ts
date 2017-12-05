class AboutUser {
  filters: string[]
  department: string // Elec, SI, MAM, ...
  typeMobility: string // Emploi, Etude
  typeResearch: string // Etranger, France, Local
  currentYear:boolean


  constructor(
  ){
    this.filters = []
    this.department = "" // Elec, SI, MAM, ...
    this.typeMobility = "" // Emploi, Etude
    this.typeResearch = "" // Etranger, France, Local
    this.currentYear = false
  }
}

export default AboutUser;