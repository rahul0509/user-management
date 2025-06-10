export interface Country {
  res: any
  name: CountryName
}

export interface CountryName {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  fra: Fra
}

export interface Fra {
  official: string
  common: string
}