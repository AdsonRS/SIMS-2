
export const stationDataMap = {
  '10102001': 'Centro de Ciências Exatas e Tecnologia (CCET)',
  '10102002': 'Centro de Ciências Humanas (CCH)',
  '10102003': 'Centro de Ciências Biológicas e da Saúde (CCBS)',
  '10102004': 'Centro de Ciências Sociais e Aplicadas (CCSo)',
  '10102005': 'Instituto de Ciência e Tecnologia (ICT)',
  '20201001': 'Reitoria (Prédio "Castelão")',
  '20201002': 'Pró-Reitoria de Ensino (PROEN)',
  '20201003': 'Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação (PPPGI)',
  '20201004': 'Pró-Reitoria de Extensão e Cultura (PROEC)',
  '20201005': 'Pró-Reitoria de Assistência Estudantil (PROAES)',
  '30301001': 'Biblioteca Central',
  '30301002': 'Restaurante Universitário (RU)',
  '30301003': 'Hospital Universitário (HU-UFMA)',
  '30301004': 'Centro de Convenções',
  '30301005': 'Núcleo de Tecnologia da Informação (NTI)',
  '30301006': 'Colégio Universitário (COLUN)',
  '30301007': 'Complexo Aquático',
  '30301008': 'Superintendência de Tecnologias na Educação (STED / UFMA Virtual)',
  '30301009': 'Pavilhão Tecnológico',
  '30301010': 'CEB Velho (Antigo Centro de Estudos Básicos)',
};

export const isValidStation = (id) => {
    return id in stationDataMap;
};
