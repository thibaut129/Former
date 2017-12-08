// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export enum departmentEnum{
  'MAM', 'ELEC', 'SI', 'BAT', 'ITII', 'GB', 'GE'
}

export enum typeMobilityEnum{
  'Emploi', 'Echange'
}

export enum typeCompanyEnum{
  'Grande Entreprise', 'Labo', 'PME', 'Start Up', 'Ecole'
}

export enum typeResearchEnum{
  'Etranger', 'France', 'Local'
}
