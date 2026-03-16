export interface NewsItem {
  id: string;
  category: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  time: string;
  readTime: string;
  views: string;
  exclusive: boolean;
  content: string;
}

export const newsData: NewsItem[] = [
  {
    id: 'neymar',
    category: 'Futebol Brasileiro',
    categorySlug: 'brasileirao',
    title: 'Neymar surpreende e anuncia retorno ao Santos para 2026',
    excerpt: 'Craque brasileiro confirma volta ao clube que o revelou e promete temporada histórica.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 2 horas',
    readTime: '5 min',
    views: '125.3k',
    exclusive: true,
    content: `<p>Em uma decisão que abalou o mundo do futebol, Neymar Jr. anunciou seu retorno ao Santos FC para a temporada 2026. O craque brasileiro, que estava no Al-Hilal da Arábia Saudita, decidiu voltar ao clube que o revelou para o futebol mundial.</p><p>"O Santos é minha casa, é onde tudo começou. Quero viver mais momentos mágicos na Vila Belmiro", declarou Neymar em coletiva de imprensa emocionante.</p><blockquote>"Meu coração sempre foi santista. Agora é hora de retribuir tudo que o Santos fez por mim"</blockquote><p>O contrato é válido por duas temporadas, com opção de renovação. A torcida do Peixe já esgotou os ingressos para os próximos jogos.</p>`
  },
  {
    id: 'champions',
    category: 'Champions League',
    categorySlug: 'champions',
    title: 'Real Madrid goleia e se classifica: Vini Jr. marca hat-trick histórico',
    excerpt: 'Brasileiro brilha com três gols e lidera classificação merengue às oitavas.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 3 horas',
    readTime: '4 min',
    views: '98.7k',
    exclusive: true,
    content: `<p>Vinícius Júnior teve uma noite mágica no Santiago Bernabéu. O brasileiro marcou três gols na goleada do Real Madrid por 5 a 1 sobre o PSG, garantindo a classificação merengue às oitavas de final da Champions League.</p><p>Com a atuação, Vini Jr. se tornou o brasileiro com mais hat-tricks na história da competição.</p>`
  },
  {
    id: 'nba-lakers',
    category: 'NBA',
    categorySlug: 'nba',
    title: 'LeBron James quebra mais um recorde histórico na NBA aos 41 anos',
    excerpt: 'King James se torna o jogador mais velho a registrar um triple-double de 40 pontos.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 4 horas',
    readTime: '4 min',
    views: '87.2k',
    exclusive: true,
    content: `<p>LeBron James continua desafiando o tempo. Aos 41 anos, o astro do Los Angeles Lakers registrou 42 pontos, 11 rebotes e 10 assistências na vitória sobre o Golden State Warriors por 128-115.</p><p>"A idade é só um número. Enquanto meu corpo permitir, vou continuar competindo no mais alto nível", declarou LeBron após o jogo.</p><p>Com a performance, ele se tornou o jogador mais velho da história da NBA a registrar um triple-double de 40 ou mais pontos.</p>`
  },
  {
    id: 'ufc-main',
    category: 'UFC',
    categorySlug: 'ufc',
    title: 'Alex Pereira defende cinturão com nocaute brutal no UFC 310',
    excerpt: 'Poatan conecta chute rodado e finaliza desafiante no segundo round em Las Vegas.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 5 horas',
    readTime: '5 min',
    views: '76.4k',
    exclusive: true,
    content: `<p>Alex "Poatan" Pereira defendeu seu cinturão dos meio-pesados do UFC com mais uma performance dominante. O brasileiro nocauteou seu desafiante no segundo round com um chute rodado devastador.</p><p>"Treino isso todos os dias. Quando vi a abertura, não hesitei", disse Pereira após a luta.</p><p>Com a vitória, Poatan chegou à sua terceira defesa de cinturão consecutiva e consolidou seu reinado na categoria.</p>`
  },
  {
    id: 'yamal',
    category: 'La Liga',
    categorySlug: 'laliga',
    title: 'Lamine Yamal renova com Barcelona até 2030 com cláusula bilionária',
    excerpt: 'Joia catalã assina novo contrato com cláusula de rescisão de 1 bilhão de euros.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 7 horas',
    readTime: '4 min',
    views: '49.5k',
    exclusive: true,
    content: `<p>O Barcelona anunciou a renovação de contrato de Lamine Yamal até 2030. O novo vínculo inclui uma cláusula de rescisão de 1 bilhão de euros.</p><blockquote>"O Barcelona é minha casa, é onde cresci e onde quero conquistar todos os títulos possíveis"</blockquote>`
  },
  {
    id: 'bayern',
    category: 'Bundesliga',
    categorySlug: 'bundesliga',
    title: 'Kane quebra recorde de Lewandowski e é artilheiro histórico do Bayern',
    excerpt: 'Inglês supera marca polaca com 42 gols na temporada.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 5 horas',
    readTime: '4 min',
    views: '41.3k',
    exclusive: true,
    content: `<p>Harry Kane superou o recorde de gols de Robert Lewandowski em uma única temporada do Bayern de Munique, com seu 42º gol da campanha.</p><blockquote>"Quebrar um recorde de Robert é especial. Ele é um dos maiores artilheiros da história"</blockquote>`
  },
  {
    id: 'nba-celtics',
    category: 'NBA',
    categorySlug: 'nba',
    title: 'Celtics dominam temporada e miram bicampeonato histórico',
    excerpt: 'Boston mantém melhor campanha da NBA e Tatum é favorito ao MVP.',
    image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75005?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 6 horas',
    readTime: '4 min',
    views: '55.1k',
    exclusive: false,
    content: `<p>O Boston Celtics segue dominando a temporada 2025-26 da NBA. Com a melhor campanha da liga, Jayson Tatum é o principal candidato ao MVP.</p><p>A equipe de Joe Mazzulla tem demonstrado uma consistência impressionante, com uma defesa sufocante e um ataque diversificado.</p>`
  },
  {
    id: 'ufc-charles',
    category: 'UFC',
    categorySlug: 'ufc',
    title: 'Charles Oliveira finaliza rival e pede revanche pelo cinturão dos leves',
    excerpt: 'Do Bronx mostra que ainda é o melhor finalizador do UFC e quer nova chance.',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 8 horas',
    readTime: '3 min',
    views: '42.8k',
    exclusive: false,
    content: `<p>Charles "Do Bronx" Oliveira finalizou seu oponente no primeiro round com uma guilhotina perfeita. Após a vitória, o brasileiro pediu uma nova chance pelo cinturão dos leves.</p><p>"Eu sou o rei dos leves. Ninguém tem mais finalizações que eu neste esporte. Quero meu cinturão de volta", declarou Oliveira.</p>`
  },
  {
    id: 'premier',
    category: 'Premier League',
    categorySlug: 'premier',
    title: 'Liverpool lidera a Premier League com futebol avassalador de Slot',
    excerpt: 'Reds mantêm invencibilidade e abrem vantagem na ponta da tabela inglesa.',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 4 horas',
    readTime: '4 min',
    views: '36.8k',
    exclusive: false,
    content: `<p>O Liverpool segue líder da Premier League com uma campanha impressionante sob o comando de Arne Slot. O time mantém uma invencibilidade de 15 jogos e abriu 6 pontos de vantagem na liderança.</p>`
  },
  {
    id: 'vasco',
    category: 'Futebol Brasileiro',
    categorySlug: 'brasileirao',
    title: 'Coutinho brilha e Vasco vence Flamengo em clássico dramático',
    excerpt: 'Meia decide clássico com gol nos acréscimos no Maracanã.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 3 horas',
    readTime: '5 min',
    views: '44.2k',
    exclusive: true,
    content: `<p>Philippe Coutinho foi o herói do Vasco na vitória por 2 a 1 sobre o Flamengo. O meia marcou o gol da vitória aos 47 minutos do segundo tempo, com uma cobrança de falta perfeita.</p>`
  },
  {
    id: 'seriea',
    category: 'Serie A',
    categorySlug: 'seriea',
    title: 'Lautaro Martínez renova com Inter até 2029 e se torna capitão',
    excerpt: 'Argentino amplia vínculo e assume braçadeira de capitão na equipe italiana.',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 6 horas',
    readTime: '4 min',
    views: '38.9k',
    exclusive: false,
    content: `<p>Lautaro Martínez renovou seu contrato com a Inter de Milão até 2029 e foi oficializado como capitão permanente da equipe.</p>`
  },
  {
    id: 'psg',
    category: 'Champions League',
    categorySlug: 'champions',
    title: 'Dembélé lidera PSG ao título da Champions com hat-trick na final',
    excerpt: 'Francês brilha e conquista primeira orelhuda para o clube parisiense.',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800',
    author: 'Redação SportiqFC',
    time: 'Há 2 horas',
    readTime: '6 min',
    views: '72.1k',
    exclusive: true,
    content: `<p>Ousmane Dembélé teve uma atuação histórica na final da Champions League. O francês marcou três gols na vitória do PSG por 4 a 2 sobre o Real Madrid.</p>`
  },
];

export const categories = [
  { id: 'all', label: 'Início', icon: '🏠' },
  { id: 'futebol', label: 'Futebol', icon: '⚽' },
  { id: 'brasileirao', label: 'Brasileirão', icon: '🇧🇷' },
  { id: 'champions', label: 'Champions', icon: '🏆' },
  { id: 'premier', label: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'laliga', label: 'La Liga', icon: '🇪🇸' },
  { id: 'seriea', label: 'Serie A', icon: '🇮🇹' },
  { id: 'bundesliga', label: 'Bundesliga', icon: '🇩🇪' },
  { id: 'nba', label: 'NBA', icon: '🏀' },
  { id: 'ufc', label: 'UFC', icon: '🥊' },
];
