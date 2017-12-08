class AboutUser {
  filters: string[]
  department: string // Elec, SI, MAM, ...
  typeMobility: string // Emploi, Etude
  typeResearch: string // Etranger, France, Local
  currentYear:boolean
  companies:string[]
  statut:string; // progress / done


  constructor(
  ){
    this.filters = []
    this.department = "" // Elec, SI, MAM, ...
    this.typeMobility = "" // Emploi, Etude
    this.typeResearch = "" // Etranger, France, Local
    this.currentYear = false
    this.companies = []
    this.statut = "progress"
  }
}

export default AboutUser;
