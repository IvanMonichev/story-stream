import { mockUsers } from '@/mock/user/users.mock'
import { Post } from '@/types/post/post.interface'

const generateArticles = (): Post[] => {
  const articles: Post[] = []
  const titles = [
    'How to Learn TypeScript',
    'JavaScript ES6 Features',
    'Understanding Async Await',
    'React vs Angular',
    'CSS Grid vs Flexbox',
    'Top 5 Frontend Frameworks',
    'Exploring Node.js',
    'What is WebAssembly?',
    'Best Practices for REST APIs',
    'Understanding JWT Authentication',
    'GraphQL vs REST',
    'Creating a Blog with React',
    'Getting Started with Docker',
    'Optimizing Web Performance',
    'Modern JavaScript Tools'
  ]

  for (let i = 0; i < 15; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    const article: Post = {
      slug: titles[i].toLowerCase().replace(/ /g, '-'),
      title: titles[i],
      description: `Прототип нового сервиса — это как грохот грома грядущих изменений ${titles[i].toLowerCase()}.`,
      body: `
            <p>Таким образом, новая модель организационной деятельности создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса экспериментов, поражающих по своей масштабности и грандиозности. Однозначно, интерактивные прототипы будут превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Противоположная точка зрения подразумевает, что стремящиеся вытеснить традиционное производство, нанотехнологии объективно рассмотрены соответствующими инстанциями.</p>
            <blockquote>
              Таким образом, постоянный количественный рост и сфера нашей активности требует от нас анализа форм воздействия. 
              Повседневная практика показывает, что высокое качество позиционных исследований не оставляет шанса для первоочередных требований. 
              Ясность нашей позиции очевидна: базовый вектор развития обеспечивает актуальность новых принципов формирования материально-технической и кадровой базы.
            </blockquote>
            <p>С учётом сложившейся международной обстановки, высокое качество позиционных исследований не оставляет шанса для новых принципов формирования материально-технической и кадровой базы. С учётом сложившейся международной обстановки, курс на социально-ориентированный национальный проект обеспечивает широкому кругу (специалистов) участие в формировании вывода текущих активов. Вот вам яркий пример современных тенденций — высокое качество позиционных исследований однозначно фиксирует необходимость вывода текущих активов. Внезапно, элементы политического процесса преданы социально-демократической анафеме! А также явные признаки победы институционализации объединены в целые кластеры себе подобных. Противоположная точка зрения подразумевает, что диаграммы связей своевременно верифицированы.</p>
            <p>Картельные сговоры не допускают ситуации, при которой элементы политического процесса разоблачены. Господа, выбранный нами инновационный путь предоставляет широкие возможности для форм воздействия. В своём стремлении повысить качество жизни, они забывают, что повышение уровня гражданского сознания предполагает независимые способы реализации позиций, занимаемых участниками в отношении поставленных задач.</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: randomUser
    }
    articles.push(article)
  }

  return articles
}

const articlesMock = generateArticles()
export default articlesMock
