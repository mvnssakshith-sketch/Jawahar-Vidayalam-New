export const stateBoardUrl = 'https://www.bse.telangana.gov.in/'
export const scertUrl = 'https://scert.telangana.gov.in/'

export const syllabusIntro = {
  board: 'Telangana State Board (BSE Telangana)',
  books: 'SCERT Telangana textbooks are prescribed for Classes I–X.',
  note: 'Jawahar Vidyalayam, Aswaraopet follows the Telangana State syllabus for classes up to Class X.',
}

export const stateSyllabus = [
  {
    id: 'nursery',
    classLabel: 'Nursery',
    stage: 'Pre-Primary',
    board: 'School curriculum (school-readiness)',
    subjects: [
      { name: 'English readiness', units: ['Phonics and letter sounds', 'Picture talk and rhymes', 'Name writing strokes', 'Listening and speaking'] },
      { name: 'Telugu readiness', units: ['Oral Telugu rhymes', 'Picture vocabulary', 'Listening stories'] },
      { name: 'Number work', units: ['Pre-number concepts', 'Counting 1–10', 'Shapes and colours', 'Sorting and matching'] },
      { name: 'EVS through play', units: ['Myself and my family', 'Plants and animals', 'Good habits', 'Festivals'] },
      { name: 'Art, music & movement', units: ['Free drawing', 'Clay and paper folding', 'Action songs', 'Outdoor play'] },
    ],
  },
  {
    id: 'lkg',
    classLabel: 'LKG',
    stage: 'Pre-Primary',
    board: 'School curriculum (school-readiness)',
    subjects: [
      { name: 'English', units: ['Letters A–Z', 'Two-letter words', 'Rhymes and stories', 'Oral conversation'] },
      { name: 'Telugu', units: ['Achulu introduction', 'Picture words', 'Rhymes'] },
      { name: 'Mathematics', units: ['Numbers 1–50', 'Before / after / between', 'Simple patterns', 'Time of day'] },
      { name: 'EVS', units: ['Body parts', 'Food we eat', 'Seasons', 'Community helpers'] },
    ],
  },
  {
    id: 'ukg',
    classLabel: 'UKG',
    stage: 'Pre-Primary',
    board: 'School curriculum preparing for Class I (State)',
    subjects: [
      { name: 'English', units: ['Three-letter words', 'Simple sentences', 'Reading primers', 'Cursive strokes'] },
      { name: 'Telugu', units: ['Achulu and hallulu', 'Two-letter words', 'Oral reading'] },
      { name: 'Mathematics', units: ['Numbers 1–100', 'Addition and subtraction (objects)', 'Tens and ones', 'Measurement (long/short)'] },
      { name: 'EVS', units: ['Living / non-living', 'Transport', 'Our neighbourhood', 'Safety rules'] },
    ],
  },
  {
    id: '1',
    classLabel: 'Class I',
    stage: 'Primary',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Letters and words', 'Simple reading', 'Rhymes', 'Oral expression'] },
      { name: 'English', units: ['Alphabet and phonics', 'Listening and speaking', 'Beginning reading', 'Picture composition'] },
      { name: 'Mathematics', units: ['Numbers', 'Addition and subtraction', 'Shapes', 'Measurement basics'] },
      { name: 'Environmental Studies', units: ['Family and friends', 'Food and water', 'Plants and animals', 'Our school'] },
      { name: 'Art / Physical Education', units: ['Drawing and craft', 'Games and health habits'] },
    ],
  },
  {
    id: '2',
    classLabel: 'Class II',
    stage: 'Primary',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Reading lessons', 'Vocabulary', 'Poems', 'Sentence writing'] },
      { name: 'English', units: ['Reading short texts', 'Grammar in context', 'Creative speaking', 'Handwriting'] },
      { name: 'Mathematics', units: ['Numbers up to 999', 'Addition and subtraction', 'Introduction to multiplication', 'Pictographs'] },
      { name: 'Environmental Studies', units: ['Our body', 'Seasons and weather', 'Travel', 'Plants around us'] },
    ],
  },
  {
    id: '3',
    classLabel: 'Class III',
    stage: 'Primary',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poems', 'Grammar basics', 'Paragraph writing'] },
      { name: 'English', units: ['Reading comprehension', 'Nouns and verbs', 'Paragraph writing', 'Listening tasks'] },
      { name: 'Mathematics', units: ['Large numbers', 'Four operations', 'Fractions (introduction)', 'Shapes, time and money'] },
      { name: 'Environmental Studies', units: ['Family and community', 'Food we eat', 'Water', 'Travel', 'Things we make'] },
      { name: 'Computer', units: ['Parts of a computer', 'Paint / typing basics', 'Safe computer habits'] },
    ],
  },
  {
    id: '4',
    classLabel: 'Class IV',
    stage: 'Primary',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poetry', 'Grammar', 'Letter writing (intro)'] },
      { name: 'English', units: ['Reading comprehension', 'Tenses and adjectives', 'Story writing', 'Listening'] },
      { name: 'Mathematics', units: ['Large numbers', 'Multiplication and division', 'Fractions', 'Perimeter', 'Data handling'] },
      { name: 'Environmental Studies', units: ['Going to school', 'Animals and plants', 'Water and waste', 'Our surroundings'] },
    ],
  },
  {
    id: '5',
    classLabel: 'Class V',
    stage: 'Primary',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poetry', 'Grammar', 'Essay writing', 'Unseen passage'] },
      { name: 'English', units: ['Prose and poems', 'Grammar revision', 'Letter and paragraph', 'Speaking and listening'] },
      { name: 'Mathematics', units: ['Large numbers', 'Fractions and decimals', 'Geometry basics', 'Measurement', 'Data handling'] },
      { name: 'Environmental Studies', units: ['Health and hygiene', 'Natural resources', 'Our state and country', 'Food and farming'] },
    ],
  },
  {
    id: '6',
    classLabel: 'Class VI',
    stage: 'Middle School',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poetry', 'Grammar', 'Composition'] },
      { name: 'English', units: ['Prose and poems', 'Grammar and writing', 'Reading comprehension'] },
      { name: 'Hindi / Sanskrit (third language)', units: ['Basic pathmala', 'Vocabulary', 'Simple sentences'] },
      { name: 'Mathematics', units: ['Numbers', 'Fractions and decimals', 'Integers', 'Geometry', 'Mensuration', 'Data handling'] },
      { name: 'General Science', units: ['Food', 'Materials', 'Living world', 'Motion and measurement', 'Light, shadows and electricity basics'] },
      { name: 'Social Studies', units: ['History — early societies', 'Geography — earth and maps', 'Civics — diversity and government'] },
    ],
  },
  {
    id: '7',
    classLabel: 'Class VII',
    stage: 'Middle School',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poetry', 'Grammar', 'Composition'] },
      { name: 'English', units: ['Prose and poems', 'Grammar and composition', 'Listening and speaking'] },
      { name: 'Hindi / Sanskrit', units: ['Reading lessons', 'Grammar', 'Writing practice'] },
      { name: 'Mathematics', units: ['Integers', 'Fractions and decimals', 'Simple equations', 'Lines and angles', 'Triangles', 'Comparing quantities', 'Data handling'] },
      { name: 'General Science', units: ['Nutrition', 'Heat', 'Acids and bases', 'Respiration', 'Motion and time', 'Electric current', 'Forests and water'] },
      { name: 'Social Studies', units: ['Medieval history themes', 'Geography — environment and earth', 'Civics — democracy and state government'] },
    ],
  },
  {
    id: '8',
    classLabel: 'Class VIII',
    stage: 'Middle School',
    board: 'Telangana State · SCERT',
    subjects: [
      { name: 'Telugu', units: ['Prose and poetry', 'Grammar', 'Composition'] },
      { name: 'English', units: ['Prose and poems', 'Grammar and writing skills'] },
      { name: 'Hindi / Sanskrit', units: ['Reading', 'Grammar', 'Writing'] },
      { name: 'Mathematics', units: ['Rational numbers', 'Linear equations', 'Quadrilaterals', 'Squares and cubes', 'Algebra', 'Mensuration', 'Data handling'] },
      { name: 'General Science', units: ['Crop production', 'Microorganisms', 'Force and pressure', 'Friction', 'Sound', 'Light', 'Chemical effects of current'] },
      { name: 'Social Studies', units: ['Modern India themes', 'Resources and agriculture', 'Constitution, parliament and judiciary'] },
    ],
  },
  {
    id: '9',
    classLabel: 'Class IX',
    stage: 'Secondary (High School)',
    board: 'BSE Telangana · SSC pattern',
    subjects: [
      { name: 'First Language — Telugu / Urdu / Hindi', units: ['Prose and poetry', 'Grammar', 'Composition as per State syllabus'] },
      { name: 'Second Language — English', units: ['Reading', 'Writing', 'Grammar', 'Vocabulary'] },
      { name: 'Third Language', units: ['Hindi / Telugu / Sanskrit as opted'] },
      { name: 'Mathematics', units: ['Number systems', 'Polynomials', 'Coordinate geometry', 'Linear equations', 'Triangles', 'Circles', 'Mensuration', 'Statistics'] },
      { name: 'Physical Science', units: ['Matter', 'Atoms and molecules', 'Motion', 'Force', 'Gravitation', 'Work and energy', 'Sound'] },
      { name: 'Biological Science', units: ['Cell', 'Tissues', 'Diversity of living organisms', 'Improvement in food resources'] },
      { name: 'Social Studies', units: ['History', 'Geography', 'Political Science', 'Economics — as per SCERT Class IX'] },
    ],
  },
  {
    id: '10',
    classLabel: 'Class X',
    stage: 'Secondary (SSC Board)',
    board: 'BSE Telangana · SSC Public Examination',
    subjects: [
      { name: 'First Language — Telugu / Urdu / Hindi', units: ['Prose and poetry', 'Grammar', 'Composition as per SSC syllabus'] },
      { name: 'Second Language — English', units: ['Reading', 'Writing', 'Grammar', 'Vocabulary'] },
      { name: 'Third Language', units: ['Hindi / Telugu / Sanskrit as opted'] },
      { name: 'Mathematics', units: ['Real numbers', 'Polynomials', 'Pair of linear equations', 'Quadratic equations', 'Progressions', 'Triangles', 'Trigonometry', 'Circles', 'Mensuration', 'Statistics', 'Probability'] },
      { name: 'Physical Science', units: ['Chemical reactions', 'Acids bases salts', 'Metals and non-metals', 'Carbon compounds', 'Light', 'Electricity', 'Electromagnetism', 'Our environment'] },
      { name: 'Biological Science', units: ['Life processes', 'Control and coordination', 'Reproduction', 'Heredity', 'Natural resources'] },
      { name: 'Social Studies', units: ['History', 'Geography', 'Political Science', 'Economics — SSC Class X State syllabus'] },
    ],
  },
]

export const syllabusGroups = [
  { id: 'pre', label: 'Pre-Primary', match: (row) => row.stage === 'Pre-Primary' },
  { id: 'primary', label: 'Primary (I–V)', match: (row) => row.stage === 'Primary' },
  { id: 'middle', label: 'Middle (VI–VIII)', match: (row) => row.stage === 'Middle School' },
  { id: 'secondary', label: 'Secondary (IX–X)', match: (row) => row.stage.includes('Secondary') },
]
