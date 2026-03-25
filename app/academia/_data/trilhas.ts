export interface Aula {
  id: string;
  titulo: string;
  tipo: "aula" | "quiz" | "pratica" | "video";
  duracao: string;
  href?: string; // link externo para módulos já existentes
  conteudo?: Block[];
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; icon: string; title: string; text: string }
  | { type: "quote"; text: string; author?: string };

export interface Trilha {
  slug: string;
  icon: string;
  bg: string;
  titulo: string;
  desc: string;
  descLonga: string;
  horas: string;
  aulas: Aula[];
  objetivos: string[];
  publicoAlvo: string;
}

export const trilhas: Trilha[] = [
  {
    slug: "fundamentos-ia",
    icon: "🧠",
    bg: "#E6F5EC",
    titulo: "Fundamentos de IA",
    desc: "O que é IA, como aprende e por que importa para o Brasil.",
    descLonga: "Do zero ao entendimento sólido. Essa trilha explica o que é IA, como ela funciona por baixo dos panos, quais são os diferentes tipos e como ela já afeta a sua vida no Brasil — sem código, sem jargão.",
    horas: "4h",
    publicoAlvo: "Iniciantes absolutos, estudantes do fundamental ao médio, profissionais que querem entender a base.",
    objetivos: [
      "Entender o que é IA e como ela é diferente de programação comum",
      "Identificar os tipos de IA e onde cada um é usado",
      "Reconhecer IA no dia a dia brasileiro",
      "Compreender os limites e riscos básicos da tecnologia",
      "Formular boas perguntas para modelos de linguagem",
    ],
    aulas: [
      {
        id: "o-que-e-ia",
        titulo: "O que é Inteligência Artificial?",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Inteligência Artificial é um campo da computação dedicado a criar sistemas capazes de realizar tarefas que, quando feitas por humanos, exigem inteligência — como reconhecer imagens, entender linguagem, tomar decisões ou aprender com experiências." },
          { type: "p", text: "Mas atenção: a IA não 'pensa' como você. Ela identifica padrões em dados. Muito bem, com muito mais velocidade do que qualquer humano — mas sem entendimento real do mundo." },
          { type: "h2", text: "IA fraca vs. IA geral" },
          { type: "p", text: "Toda IA existente hoje é 'IA fraca' (ou narrow AI): ela faz uma coisa específica muito bem. O ChatGPT gera texto. O AlphaFold prevê estrutura de proteínas. O algoritmo do TikTok recomenda vídeos. Nenhum deles consegue fazer as três coisas." },
          { type: "p", text: "IA Geral — uma IA que raciocine como um humano em qualquer situação — ainda não existe, apesar do que filmes e notícias exageradas sugerem." },
          { type: "h2", text: "IA já está no seu dia a dia" },
          { type: "list", items: [
            "O reconhecimento de rosto do seu celular",
            "O anti-spam do seu e-mail",
            "As recomendações do Netflix e Spotify",
            "O corretor automático do WhatsApp",
            "A voz do Google Maps",
            "A detecção de fraude no seu cartão de crédito",
          ]},
          { type: "callout", icon: "🇧🇷", title: "No Brasil", text: "O Pix usa IA para detectar transações suspeitas em tempo real. O DETRAN usa reconhecimento facial. O INSS usa IA para analisar pedidos de benefício. A IA já toma decisões que afetam a vida de milhões de brasileiros." },
        ],
      },
      {
        id: "historia-da-ia",
        titulo: "História da IA: de Turing ao ChatGPT",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "A IA não surgiu do nada em 2022. Ela tem mais de 70 anos de história — com altos, baixos e reviravoltas que moldaram o que temos hoje." },
          { type: "h2", text: "Os marcos principais" },
          { type: "list", items: [
            "1950 — Alan Turing propõe o 'Teste de Turing': pode uma máquina ser indistinguível de um humano?",
            "1956 — Nasce oficialmente o campo de IA, na Conferência de Dartmouth",
            "1970s-80s — 'Inverno da IA': promessas não cumpridas cortam financiamento",
            "1997 — Deep Blue (IBM) vence o campeão mundial de xadrez Garry Kasparov",
            "2012 — AlexNet revoluciona visão computacional com redes neurais profundas",
            "2017 — Google publica o paper 'Attention Is All You Need', criando os Transformers",
            "2020 — GPT-3 mostra que LLMs podem gerar texto impressionantemente humano",
            "2022 — ChatGPT ultrapassa 100 milhões de usuários em 2 meses — o crescimento mais rápido da história",
          ]},
          { type: "h2", text: "Por que os Transformers mudaram tudo?" },
          { type: "p", text: "Antes dos Transformers, ensinar IA a entender linguagem era extremamente difícil. A arquitetura Transformer permitiu que modelos processassem palavras em paralelo e entendessem o contexto completo de uma frase — não só palavra por palavra." },
          { type: "p", text: "GPT, Claude, Gemini e LLaMA são todos baseados em Transformers. Essa arquitetura é o motor da revolução atual." },
        ],
      },
      {
        id: "como-ia-aprende",
        titulo: "Como a IA aprende? Machine Learning explicado",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "A diferença fundamental entre IA e programação tradicional: na programação, você diz ao computador exatamente o que fazer em cada situação. No Machine Learning, você mostra exemplos e o computador descobre sozinho as regras." },
          { type: "h2", text: "Os três tipos de aprendizado" },
          { type: "h3", text: "Aprendizado supervisionado" },
          { type: "p", text: "Você dá exemplos com as respostas certas: 'estas 10.000 fotos são de cachorros, estas são de gatos'. O modelo aprende a classificar novas fotos. É o tipo mais comum." },
          { type: "h3", text: "Aprendizado não supervisionado" },
          { type: "p", text: "Sem rótulos — o modelo descobre padrões sozinho. É assim que algoritmos de recomendação descobrem que 'quem gosta de X tende a gostar de Y'." },
          { type: "h3", text: "Aprendizado por reforço" },
          { type: "p", text: "O modelo toma ações, recebe recompensas ou punições, e aprende a maximizar a recompensa. Foi assim que o AlphaGo aprendeu a jogar Go melhor do que qualquer humano." },
          { type: "callout", icon: "🍕", title: "Analogia brasileira", text: "Imagine ensinar alguém a distinguir pizza boa de pizza ruim. Supervisionado: você mostra 1.000 pizzas com notas. Não supervisionado: ele come 1.000 pizzas e descobre padrões por conta própria. Reforço: cada vez que ele pede uma boa pizza, ganha um ponto." },
        ],
      },
      {
        id: "tipos-de-ia",
        titulo: "Tipos de IA: onde cada um é usado",
        tipo: "aula",
        duracao: "15 min",
        conteudo: [
          { type: "p", text: "Nem toda IA é igual. Existem tipos diferentes, cada um otimizado para um conjunto de tarefas." },
          { type: "h2", text: "Principais tipos de IA" },
          { type: "list", items: [
            "Modelos de linguagem (LLMs): geram e entendem texto — ChatGPT, Claude, Gemini",
            "Visão computacional: reconhecem imagens e vídeos — câmeras de segurança, diagnóstico médico por imagem",
            "Sistemas de recomendação: sugerem conteúdo personalizado — Netflix, Spotify, TikTok",
            "Detecção de anomalias: identificam padrões fora do normal — antifraude bancário",
            "Processamento de fala: convertem fala em texto e vice-versa — assistentes de voz, transcrição",
            "IA generativa de imagem: geram imagens a partir de texto — DALL-E, Midjourney, Stable Diffusion",
          ]},
        ],
      },
      {
        id: "dados-treinamento",
        titulo: "O que são dados de treinamento?",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Dados são o combustível da IA. Sem dados, não há aprendizado. A qualidade, quantidade e diversidade dos dados determinam, mais do que qualquer outra coisa, o desempenho e os vieses de um modelo." },
          { type: "h2", text: "De onde vêm os dados?" },
          { type: "list", items: [
            "Internet: bilhões de páginas, artigos, fóruns, redes sociais",
            "Livros digitalizados: acervos como Common Crawl e The Pile",
            "Dados proprietários: conversas de clientes, documentos internos",
            "Dados gerados por humanos: avaliações, transcrições, anotações",
            "Dados sintéticos: dados artificialmente gerados por outros modelos",
          ]},
          { type: "callout", icon: "⚠️", title: "Problema de representação", text: "Se os dados de treinamento têm pouco conteúdo em português, especialmente de regiões menos conectadas do Brasil, o modelo será menos preciso para esse público. Isso cria uma desigualdade digital dentro do próprio uso de IA." },
        ],
      },
      {
        id: "redes-neurais",
        titulo: "Redes neurais: como o cérebro inspirou a IA",
        tipo: "aula",
        duracao: "25 min",
        conteudo: [
          { type: "p", text: "Redes neurais artificiais foram inspiradas no funcionamento do cérebro humano — embora sejam muito mais simples. A ideia básica: neurônios artificiais recebem sinais, processam e passam adiante." },
          { type: "h2", text: "Como funciona uma rede neural" },
          { type: "p", text: "Imagine uma rede com três camadas: entrada (recebe os dados), oculta (processa) e saída (dá o resultado). Cada conexão tem um 'peso' — um número que indica quanto aquele sinal importa. O treinamento ajusta esses pesos iterativamente até o modelo acertar as respostas." },
          { type: "p", text: "Redes profundas (deep learning) têm muitas camadas ocultas — isso permite que aprendam representações cada vez mais abstratas. Na primeira camada, reconhece bordas. Na segunda, formas. Na terceira, objetos. E assim por diante." },
        ],
      },
      {
        id: "llms-transformers",
        titulo: "LLMs e Transformers: o motor do ChatGPT",
        tipo: "aula",
        duracao: "20 min",
        href: "/academia/artigos/como-llms-funcionam",
      },
      {
        id: "ia-generativa",
        titulo: "IA generativa: imagens, texto e áudio",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "IA generativa é qualquer sistema que cria conteúdo novo — texto, imagem, áudio, código, vídeo — em vez de apenas classificar ou prever." },
          { type: "h2", text: "Como imagens são geradas?" },
          { type: "p", text: "Modelos como DALL-E e Stable Diffusion usam uma técnica chamada difusão: partem de ruído puro (pixels aleatórios) e, passo a passo, refinam a imagem até ela corresponder ao texto pedido. É como revelar uma foto por partes." },
          { type: "h2", text: "Impacto no mercado de trabalho brasileiro" },
          { type: "list", items: [
            "Design: criação de mockups e variações em segundos",
            "Marketing: geração de copys, textos e imagens de campanha",
            "Atendimento: chatbots que entendem português regional",
            "Jurídico: rascunho de contratos e petições",
            "Educação: geração de exercícios personalizados",
          ]},
        ],
      },
      {
        id: "limitacoes-ia",
        titulo: "Limitações e erros: o que a IA não consegue fazer",
        tipo: "aula",
        duracao: "15 min",
        conteudo: [
          { type: "p", text: "Entender os limites da IA é tão importante quanto entender suas capacidades. Profissionais que subestimam as limitações tomam decisões perigosas; os que as conhecem usam IA com muito mais eficiência." },
          { type: "h2", text: "O que a IA faz mal" },
          { type: "list", items: [
            "Raciocínio matemático complexo e lógica formal",
            "Fatos verificáveis em tempo real (data de corte do treinamento)",
            "Entendimento de contexto cultural muito específico",
            "Senso comum sobre o mundo físico",
            "Memória persistente entre conversas (por padrão)",
            "Garantia de veracidade — pode inventar com confiança",
          ]},
          { type: "callout", icon: "🎯", title: "Regra prática", text: "Use IA para: rascunhos, brainstorming, explicações, tradução, código. Não use IA sem verificação para: diagnósticos médicos, aconselhamento jurídico, notícias factuais, informações sobre pessoas reais." },
        ],
      },
      {
        id: "prompt-engineering-basico",
        titulo: "Prompt Engineering: faça as perguntas certas",
        tipo: "pratica",
        duracao: "30 min",
        href: "/aprender/prompt-lab",
      },
      {
        id: "ia-etica-responsavel",
        titulo: "IA ética: o básico que todo cidadão precisa saber",
        tipo: "aula",
        duracao: "18 min",
        href: "/academia/artigos/vies-racial-algoritmos-credito",
      },
      {
        id: "quiz-fundamentos",
        titulo: "Quiz: teste seus conhecimentos",
        tipo: "quiz",
        duracao: "15 min",
        href: "/aprender",
      },
    ],
  },

  {
    slug: "machine-learning",
    icon: "⚙️",
    bg: "#E8F4FD",
    titulo: "Machine Learning na Prática",
    desc: "Modelos, dados e treinamento — sem precisar ser programador.",
    descLonga: "Entenda como os modelos de Machine Learning são construídos, avaliados e colocados em produção. Foco em conceitos, casos reais brasileiros e intuição — sem precisar escrever uma linha de código.",
    horas: "3h30",
    publicoAlvo: "Pessoas com curiosidade técnica, gestores que aprovam projetos de IA, analistas de dados iniciantes.",
    objetivos: [
      "Entender o ciclo completo de um projeto de ML",
      "Conhecer os principais algoritmos e quando usar cada um",
      "Avaliar a qualidade de modelos sem entrar em matemática avançada",
      "Identificar armadilhas comuns em projetos de ML",
      "Ler e interpretar resultados de modelos de ML",
    ],
    aulas: [
      {
        id: "ciclo-ml",
        titulo: "O ciclo de vida de um projeto de ML",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Um projeto de Machine Learning segue etapas bem definidas, cada uma com seus próprios desafios. Entender esse ciclo ajuda gestores, analistas e desenvolvedores a trabalhar juntos de forma mais eficiente." },
          { type: "h2", text: "As etapas" },
          { type: "list", items: [
            "1. Definição do problema: o que queremos prever ou classificar?",
            "2. Coleta de dados: de onde virão os dados? Que qualidade têm?",
            "3. Exploração e limpeza: entender, corrigir e preparar os dados",
            "4. Feature engineering: criar variáveis mais informativas para o modelo",
            "5. Treinamento: ajustar o modelo nos dados históricos",
            "6. Avaliação: testar em dados que o modelo nunca viu",
            "7. Deploy: colocar em produção e monitorar continuamente",
          ]},
          { type: "callout", icon: "💡", title: "Onde os projetos brasileiros falham", text: "A maioria dos projetos de ML no Brasil falha não na parte de algoritmos, mas na qualidade dos dados (passo 2) ou no deploy e monitoramento (passo 7). Dados bagunçados e modelos não monitorados são os maiores vilões." },
        ],
      },
      {
        id: "tipos-algoritmos",
        titulo: "Principais algoritmos: quando usar cada um",
        tipo: "aula",
        duracao: "25 min",
        conteudo: [
          { type: "p", text: "Existem dezenas de algoritmos de ML. A boa notícia: você não precisa dominar todos. Entender quando usar os principais já resolve a maioria dos problemas práticos." },
          { type: "h2", text: "Algoritmos de classificação" },
          { type: "p", text: "Para responder 'qual categoria?': fraude ou não fraude, churn ou não, diagnóstico A ou B." },
          { type: "list", items: [
            "Regressão Logística: simples, rápido, interpretável — bom ponto de partida",
            "Árvores de Decisão: fácil de explicar, mas tende a overfitting",
            "Random Forest: conjunto de árvores — mais robusto, difícil de interpretar",
            "XGBoost/LightGBM: o mais usado em competições e produção de ML",
            "Redes Neurais: exige mais dados e poder computacional, mas é muito poderoso",
          ]},
          { type: "h2", text: "Algoritmos de regressão" },
          { type: "p", text: "Para responder 'qual valor?': previsão de preço, demanda, tempo de entrega." },
          { type: "list", items: [
            "Regressão Linear: base para entender regressão, boa para relações lineares",
            "Ridge/Lasso: regressão linear com regularização para evitar overfitting",
            "Gradient Boosting: poderoso para previsão numérica com dados tabulares",
          ]},
        ],
      },
      {
        id: "dados-preparacao",
        titulo: "Preparação de dados: a etapa que consome 80% do tempo",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "Dados sujos são o maior problema de ML em produção. Um modelo perfeito com dados ruins dá resultados piores do que um modelo simples com dados de qualidade." },
          { type: "h2", text: "Problemas mais comuns nos dados brasileiros" },
          { type: "list", items: [
            "CPF duplicado ou inválido em bases de clientes",
            "CEP desatualizado ou inconsistente com cidade/estado",
            "Nomes com variações ('Maria', 'maria', 'MARIA', 'Maria  ')",
            "Dados de renda em moedas diferentes (pré-plano real vs. atual)",
            "Campos obrigatórios vazios por falha de sistema legado",
            "Viés de cobertura: dados de São Paulo super-representados vs. Norte/Nordeste",
          ]},
        ],
      },
      {
        id: "avaliacao-modelos",
        titulo: "Como avaliar um modelo sem entrar em matemática",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Precisão de 95% parece ótimo — mas pode ser péssimo dependendo do problema. Um modelo que sempre diz 'não é fraude' numa base onde 95% das transações são legítimas tem 95% de acurácia, mas é inútil." },
          { type: "h2", text: "Métricas que realmente importam" },
          { type: "list", items: [
            "Acurácia: % de previsões corretas — útil apenas com classes balanceadas",
            "Precisão: de tudo que predisse positivo, quantos eram? (evita falsos alarmes)",
            "Recall: de todos os positivos reais, quantos encontrou? (evita falsos negativos)",
            "F1-Score: equilíbrio entre precisão e recall",
            "AUC-ROC: capacidade geral do modelo de distinguir classes",
          ]},
          { type: "callout", icon: "🏥", title: "Exemplo médico", text: "Num teste de câncer, você prefere alta precisão ou alto recall? Recall: melhor detectar todos os casos, mesmo com alguns falsos alarmes, do que deixar casos reais passarem." },
        ],
      },
      {
        id: "overfitting",
        titulo: "Overfitting: quando a IA decora em vez de aprender",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "Overfitting é quando o modelo aprende tão bem os dados de treinamento que perde a capacidade de generalizar para dados novos. É o equivalente a um estudante que decora as questões passadas mas não aprende o conteúdo." },
          { type: "h2", text: "Como detectar overfitting" },
          { type: "p", text: "A diferença entre o desempenho nos dados de treino e nos dados de teste revela overfitting: se no treino o modelo acerta 99% e no teste acerta 65%, há overfitting severo." },
          { type: "h2", text: "Como corrigir" },
          { type: "list", items: [
            "Mais dados de treinamento",
            "Regularização (penalizar modelos complexos demais)",
            "Simplificar o modelo",
            "Dropout em redes neurais",
            "Validação cruzada para avaliação mais robusta",
          ]},
        ],
      },
      {
        id: "features-variaveis",
        titulo: "Feature Engineering: criando variáveis que fazem diferença",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Feature engineering é a arte de transformar dados brutos em variáveis que o modelo consegue usar melhor. É onde o conhecimento do domínio (negócio) tem mais valor." },
          { type: "h2", text: "Exemplos práticos brasileiros" },
          { type: "list", items: [
            "Datas: dia da semana, feriado nacional, dia útil vs. fim de semana",
            "CEP: converter para região, IDH do bairro, distância de centros urbanos",
            "CPF: calcular idade a partir dos primeiros dígitos",
            "Valores: deflacionar por IPCA para comparar períodos diferentes",
            "Texto: sentimento de avaliações de clientes (NPS em escala)",
          ]},
        ],
      },
      {
        id: "ml-producao",
        titulo: "ML em produção: o que ninguém conta nos tutoriais",
        tipo: "aula",
        duracao: "25 min",
        conteudo: [
          { type: "p", text: "Treinar um modelo é 20% do trabalho. Colocar em produção, monitorar e manter é os outros 80%. A maioria dos tutoriais ensina só o começo." },
          { type: "h2", text: "Problemas em produção" },
          { type: "list", items: [
            "Data drift: os dados que chegam mudam com o tempo, degradando o modelo",
            "Concept drift: o que era verdade mudou (pandemia, nova lei, comportamento do consumidor)",
            "Latência: o modelo precisa responder rápido o suficiente?",
            "Custo: inferência em GPU é cara — vale a precisão extra?",
            "Monitoramento: quem vai perceber que o modelo começou a errar?",
          ]},
          { type: "callout", icon: "🚨", title: "Caso real", text: "Um modelo de crédito treinado em 2019 não previu o comportamento dos consumidores durante a pandemia de 2020. Empresas que não monitoravam seus modelos tiveram perdas significativas por decisões baseadas em previsões obsoletas." },
        ],
      },
      {
        id: "viés-ml",
        titulo: "Viés em ML: o que seus dados escondem",
        tipo: "aula",
        duracao: "20 min",
        href: "/academia/artigos/vies-racial-algoritmos-credito",
      },
      {
        id: "nlp-portugues",
        titulo: "NLP em Português: processando o nosso idioma",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "O Processamento de Linguagem Natural (NLP) em português apresenta desafios únicos: diminutivos, gírias regionais, concordância nominal complexa, e poucos dados de alta qualidade comparados ao inglês." },
          { type: "h2", text: "Modelos focados no português" },
          { type: "list", items: [
            "BERTimbau: versão do BERT treinada em corpus brasileiro, pela FAPESP/USP",
            "Maritalk: LLM desenvolvido pela Maritaca AI focado no português",
            "Sabiá: família de modelos da Maritaca AI com foco no Brasil",
            "PTT5: modelo seq2seq pré-treinado em português",
          ]},
          { type: "callout", icon: "🇧🇷", title: "Pesquisa brasileira", text: "O BERTimbau foi treinado com 2,7 bilhões de palavras em português — jornais, Wikip\u00e9dia e projetos Gutenberg. É uma das maiores contribuições do Brasil para NLP open-source." },
        ],
      },
      {
        id: "quiz-ml",
        titulo: "Quiz: avaliação de conhecimentos em ML",
        tipo: "quiz",
        duracao: "15 min",
        href: "/aprender",
      },
    ],
  },

  {
    slug: "etica-vies-regulacao",
    icon: "⚖️",
    bg: "#FFF3CD",
    titulo: "Ética, Viés & Regulação",
    desc: "Discriminação algorítmica, LGPD e o PL de IA no Brasil.",
    descLonga: "A IA não é neutra. Esta trilha explora como sistemas de IA reproduzem e amplificam desigualdades, o que diz a legislação brasileira e como construir IA mais responsável e justa.",
    horas: "2h45",
    publicoAlvo: "Profissionais de direito, policy makers, gestores de produto, qualquer pessoa afetada por decisões algorítmicas.",
    objetivos: [
      "Identificar e nomear diferentes formas de viés algorítmico",
      "Conhecer a LGPD e suas implicações para sistemas de IA",
      "Entender o PL 2338/2023 e suas obrigações práticas",
      "Aplicar princípios de IA responsável em projetos reais",
      "Conhecer casos brasileiros de discriminação algorítmica",
    ],
    aulas: [
      {
        id: "ia-nao-e-neutra",
        titulo: "IA não é neutra: por que isso importa",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "Uma crença comum: 'algoritmos são objetivos porque são matemática'. É uma das ideias mais perigosas sobre IA. Algoritmos refletem as escolhas de quem os construiu — quais dados usar, qual métrica otimizar, quais erros tolerar." },
          { type: "p", text: "Um algoritmo que otimiza para 'maximizar lucro' vai sistematicamente priorizar consumidores de maior renda. Um algoritmo que 'minimiza custos de saúde' pode recomendar menos cuidados preventivos para populações marginalizadas. As escolhas de design têm consequências políticas." },
          { type: "h2", text: "Quem decide quais erros são aceitáveis?" },
          { type: "p", text: "Todo modelo comete erros. A pergunta é: quais erros? Um erro de diagnóstico que afeta desproporcionalmente a população negra é diferente de um erro aleatório. As escolhas sobre tolerância a erros são escolhas éticas, não apenas técnicas." },
          { type: "callout", icon: "🏛️", title: "Caso COMPAS nos EUA", text: "O algoritmo COMPAS, usado para prever reincidência criminal em sentenças, mostrou viés racial sistemático: era duas vezes mais provável classificar réus negros como alto risco comparado a réus brancos com histórico similar. O Brasil usa sistemas similares?" },
        ],
      },
      {
        id: "tipos-vies",
        titulo: "Tipos de viés algorítmico: um guia completo",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "Viés algorítmico não é um único problema — são muitos tipos diferentes, que surgem em momentos distintos do ciclo de vida do modelo." },
          { type: "h2", text: "Viés de dados históricos" },
          { type: "p", text: "Os dados refletem discriminações passadas. Um modelo de contratação treinado em dados históricos onde poucas mulheres eram contratadas para cargos técnicos vai perpetuar essa tendência." },
          { type: "h2", text: "Viés de representação" },
          { type: "p", text: "Alguns grupos estão sub-representados nos dados. Sistemas de reconhecimento facial treinados principalmente em rostos brancos têm taxa de erro muito maior em rostos negros." },
          { type: "h2", text: "Viés de medição" },
          { type: "p", text: "A variável que estamos medindo pode ser enviesada. 'Prisões anteriores' como proxy de risco criminal é viesada se a polícia patrulhou mais intensamente bairros pobres e negros." },
          { type: "h2", text: "Viés de feedback" },
          { type: "p", text: "O modelo toma decisões que moldam os dados futuros. Se um algoritmo de crédito nega empréstimos para moradores da periferia, os dados futuros mostrarão 'menos inadimplência' nessa população — não porque sejam melhores pagadores, mas porque nunca receberam crédito." },
        ],
      },
      {
        id: "casos-brasileiros-vies",
        titulo: "Discriminação algorítmica no Brasil: casos reais",
        tipo: "aula",
        duracao: "20 min",
        href: "/academia/artigos/vies-racial-algoritmos-credito",
      },
      {
        id: "vies-na-maquina-pratica",
        titulo: "Prática: Viés na Máquina",
        tipo: "pratica",
        duracao: "30 min",
        href: "/aprender/vies-na-maquina",
      },
      {
        id: "lgpd-ia",
        titulo: "LGPD aplicada a sistemas de IA",
        tipo: "aula",
        duracao: "25 min",
        conteudo: [
          { type: "p", text: "A Lei Geral de Proteção de Dados (Lei 13.709/2018) é totalmente aplicável a sistemas de IA que processam dados pessoais — o que inclui a maioria dos sistemas de IA de negócio." },
          { type: "h2", text: "Princípios LGPD relevantes para IA" },
          { type: "list", items: [
            "Finalidade: dados coletados para X não podem ser usados para treinar IA para Y sem nova base legal",
            "Necessidade: use apenas os dados mínimos necessários",
            "Transparência: o titular tem direito de saber que IA processa seus dados",
            "Não discriminação: a LGPD proíbe uso de dados para discriminação ilícita",
            "Responsabilização: quem desenvolveu e quem usa a IA são corresponsáveis",
          ]},
          { type: "h2", text: "Decisões automatizadas e o direito à explicação" },
          { type: "p", text: "O artigo 20 da LGPD garante ao titular o direito de solicitar revisão de decisões tomadas unicamente por meios automatizados. O controlador deve fornecer critérios e procedimentos claros da decisão." },
          { type: "callout", icon: "⚖️", title: "Ponto de atenção", text: "Muitas empresas brasileiras que usam scoring de crédito, análise de risco ou filtragem de currículos podem estar em desconformidade com o artigo 20 da LGPD se não têm processo de revisão humana disponível." },
        ],
      },
      {
        id: "pl-ia-brasil",
        titulo: "PL 2338/2023: guia prático para empresas",
        tipo: "aula",
        duracao: "25 min",
        href: "/academia/artigos/pl-2338-2023-empresas-brasileiras",
      },
      {
        id: "ia-responsavel",
        titulo: "Construindo IA responsável: princípios e prática",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "IA responsável não é apenas sobre evitar danos — é sobre construir sistemas que criam valor de forma justa, transparente e sustentável. Principais frameworks internacionais (OCDE, UE, IEEE) convergem em princípios similares." },
          { type: "h2", text: "Os seis princípios de IA responsável" },
          { type: "list", items: [
            "Justiça: não discriminar grupos protegidos e tratar todos equitativamente",
            "Confiabilidade: funcionar corretamente e de forma consistente",
            "Privacidade e segurança: proteger dados pessoais por design",
            "Inclusão: ser acessível e útil para populações diversas",
            "Transparência: explicar como funciona e quais dados usa",
            "Responsabilização: ter humanos responsáveis pelas decisões e impactos",
          ]},
          { type: "h2", text: "Ferramentas práticas" },
          { type: "list", items: [
            "Cards de modelo (Model Cards): documentação padronizada de como o modelo funciona e seus limites",
            "Folhas de dados (Datasheets for Datasets): documentação de origem, limitações e vieses dos dados",
            "Avaliação de Impacto Algorítmico: análise sistemática de riscos antes do deploy",
            "Auditorias de equidade: testes regulares de disparidade por grupo",
          ]},
        ],
      },
      {
        id: "quiz-etica",
        titulo: "Quiz: ética e regulação de IA",
        tipo: "quiz",
        duracao: "15 min",
        href: "/aprender",
      },
    ],
  },

  {
    slug: "ia-setor-publico",
    icon: "🏛️",
    bg: "#FCE8E8",
    titulo: "IA no Setor Público",
    desc: "Saúde, educação, segurança — como o governo usa IA hoje.",
    descLonga: "O governo brasileiro já usa IA em dezenas de serviços públicos — alguns com impacto positivo imenso, outros com riscos pouco discutidos. Esta trilha explora casos reais, oportunidades e riscos da IA no poder público.",
    horas: "3h",
    publicoAlvo: "Servidores públicos, gestores municipais e estaduais, estudantes de administração pública e políticas públicas.",
    objetivos: [
      "Conhecer como o governo federal usa IA hoje",
      "Identificar oportunidades de IA para melhorar serviços públicos",
      "Entender os riscos específicos da IA no contexto governamental",
      "Aplicar princípios de transparência algorítmica ao setor público",
      "Avaliar projetos de IA pública com senso crítico",
    ],
    aulas: [
      {
        id: "ia-governo-federal",
        titulo: "Como o governo federal brasileiro usa IA",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "O governo federal brasileiro usa IA em dezenas de sistemas — muitos deles afetam diretamente a vida dos cidadãos, mas são pouco conhecidos pelo grande público." },
          { type: "h2", text: "Sistemas de IA no governo federal" },
          { type: "list", items: [
            "INSS: IA para análise de benefícios e detecção de fraude (Projeto Acesso — reduziu filas em 40%)",
            "Receita Federal: IA para fiscalização de declarações do IR e detecção de sonegação",
            "DATASUS: análise preditiva de epidemias e distribuição de recursos de saúde",
            "Tribunal de Contas da União: IA para auditorias de contratos públicos",
            "Detran (estados): reconhecimento facial e OCR para habilitação e multas",
            "Polícia Federal: biometria e reconhecimento facial em fronteiras e aeroportos",
          ]},
          { type: "callout", icon: "⚠️", title: "Transparência em falta", text: "A maioria dos sistemas de IA do governo não tem documentação pública sobre como funciona, quais dados usa ou como erros são corrigidos. O PL 2338/2023 deve exigir transparência algorítmica do poder público — uma mudança significativa." },
        ],
      },
      {
        id: "ia-saude-publica",
        titulo: "IA na saúde pública brasileira",
        tipo: "aula",
        duracao: "25 min",
        conteudo: [
          { type: "p", text: "O SUS atende 75% dos brasileiros e gera uma quantidade enorme de dados de saúde. A IA tem potencial transformador — e riscos significativos nesse contexto." },
          { type: "h2", text: "Aplicações promissoras" },
          { type: "list", items: [
            "Triagem inteligente: chatbots que orientam pacientes antes da consulta",
            "Diagnóstico por imagem: detecção de tuberculose, câncer de mama, retinopatia diabética",
            "Vigilância epidemiológica: detecção precoce de surtos por análise de dados de prontuários",
            "Distribuição de recursos: previsão de demanda por UTIs, medicamentos e equipes",
            "Predição de abandono de tratamento: para HIV, tuberculose, hipertensão",
          ]},
          { type: "h2", text: "Riscos no contexto brasileiro" },
          { type: "list", items: [
            "Viés racial em diagnóstico por imagem treinado em populações de maioria branca",
            "Desigualdade de infraestrutura: IA funciona bem onde tem internet estável",
            "Privacidade: prontuários são dados sensíveis com proteção reforçada",
            "Substituição de profissionais em regiões já carentes de médicos",
          ]},
        ],
      },
      {
        id: "ia-educacao-publica",
        titulo: "IA nas escolas públicas brasileiras",
        tipo: "aula",
        duracao: "20 min",
        href: "/academia/artigos/ia-sala-de-aula-autoria",
      },
      {
        id: "reconhecimento-facial-brasil",
        titulo: "Reconhecimento facial: usos e abusos no Brasil",
        tipo: "aula",
        duracao: "22 min",
        conteudo: [
          { type: "p", text: "O Brasil é um dos países que mais usa reconhecimento facial no mundo — em aeroportos, estádios, transportes públicos e operações policiais. Mas a regulação ainda está muito atrás da tecnologia." },
          { type: "h2", text: "Onde é usado no Brasil" },
          { type: "list", items: [
            "Aeroportos: Guarulhos, Galeão e outros usam para embarque e imigração",
            "Metrôs: São Paulo, Rio e Salvador usam para acesso e segurança",
            "Carnaval e eventos: operações policiais para identificar suspeitos em multidões",
            "Programas sociais: Cadastro Único e outros benefícios",
            "Bancos e fintechs: verificação de identidade no onboarding digital",
          ]},
          { type: "h2", text: "Problemas documentados no Brasil" },
          { type: "p", text: "Entre 2019 e 2024, ao menos 8 casos documentados de prisão errônea por falha de reconhecimento facial foram registrados no Brasil. Em todos os casos, as vítimas eram pessoas negras. Sistemas usados pelas polícias estaduais têm taxa de erro de até 26% para pessoas negras." },
          { type: "callout", icon: "⚠️", title: "Atenção", text: "Nenhum estado brasileiro tem regulação específica sobre uso policial de reconhecimento facial. O PL 2338/2023 propõe classificar isso como 'risco excessivo' — mas a versão original foi enfraquecida durante tramitação." },
        ],
      },
      {
        id: "ia-seguranca-publica",
        titulo: "IA e segurança pública: entre eficiência e vigilância",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "A IA está sendo amplamente adotada por forças de segurança — com promessas de redução de crime e riscos sérios de discriminação e vigilância em massa." },
          { type: "h2", text: "Ferramentas em uso" },
          { type: "list", items: [
            "Preditores de criminalidade: mapeamento de áreas de risco com ML",
            "Câmeras inteligentes: reconhecimento facial, leitura de placa, detecção de comportamento suspeito",
            "Análise de redes sociais: monitoramento de grupos e indivíduos",
            "Sistemas de dispatch inteligente: otimização do patrulhamento",
          ]},
          { type: "h2", text: "O problema da profecia autorrealizável" },
          { type: "p", text: "Se um algoritmo prevê mais crime em bairros pobres e negros, mais policiais são enviados para lá. Mais policiais = mais prisões. Mais prisões nos dados = previsão confirmada. O algoritmo 'aprende' que acertou — mas na verdade criou o resultado que previu." },
        ],
      },
      {
        id: "compras-publicas-ia",
        titulo: "IA em compras públicas e contratos",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "O TCU, CGU e órgãos estaduais de controle usam IA para auditar contratos públicos — uma das aplicações mais promissoras para combater corrupção no Brasil." },
          { type: "h2", text: "O que a IA já encontrou" },
          { type: "list", items: [
            "ALICE (TCU): detecta irregularidades em licitações — conluio, sobrepreço, empresas fantasmas",
            "Detecta irregularidades em 10 segundos o que levaria semanas manual",
            "Mapeou mais de R$2 bilhões em contratos suspeitos entre 2020-2024",
            "Previsão de inadimplência em contratos: identifica fornecedores em risco",
          ]},
        ],
      },
      {
        id: "transparencia-algoritmica",
        titulo: "Transparência algorítmica no setor público",
        tipo: "aula",
        duracao: "20 min",
        conteudo: [
          { type: "p", text: "Quando um algoritmo governa, o cidadão precisa poder entendê-lo, questioná-lo e contestar suas decisões. Transparência algorítmica é um direito democrático." },
          { type: "h2", text: "O que significa transparência algorítmica" },
          { type: "list", items: [
            "Publicação de documentação sobre como o sistema funciona",
            "Acesso a dados sobre taxas de erro por grupo demográfico",
            "Processo claro para contestar decisões automatizadas",
            "Auditorias independentes periódicas",
            "Participação da sociedade civil no design de sistemas públicos",
          ]},
          { type: "h2", text: "O que falta no Brasil" },
          { type: "p", text: "O Brasil não tem obrigação legal de transparência algorítmica para sistemas governamentais. O PL 2338/2023 deve criar essa obrigação — mas com prazo de implementação. A LAI (Lei de Acesso à Informação) já permite solicitar informações sobre sistemas públicos, mas poucos cidadãos usam esse mecanismo." },
        ],
      },
      {
        id: "ebia-politica-ia",
        titulo: "EBIA: a estratégia nacional de IA do Brasil",
        tipo: "aula",
        duracao: "18 min",
        conteudo: [
          { type: "p", text: "A Estratégia Brasileira de Inteligência Artificial (EBIA), atualizada em 2024, é o documento que guia a política nacional de IA. Entender a EBIA é essencial para quem trabalha com políticas públicas." },
          { type: "h2", text: "Os seis eixos da EBIA 2024-2028" },
          { type: "list", items: [
            "Legislação, regulação e uso ético: criar marco regulatório equilibrado",
            "Governança: coordenação entre governo, academia e sociedade civil",
            "Qualificação: formar 500 mil profissionais de IA até 2028",
            "Pesquisa, desenvolvimento e inovação: ampliar pesquisa nacional em IA",
            "Aplicação no governo: modernizar serviços públicos com IA",
            "Infraestrutura: garantir acesso a computação e dados para pesquisa",
          ]},
          { type: "callout", icon: "🎯", title: "Meta central", text: "A EBIA tem como meta posicionar o Brasil entre os 10 maiores produtores de pesquisa em IA do mundo até 2028. Em 2024, o Brasil era o 14º colocado em publicações científicas sobre IA." },
        ],
      },
      {
        id: "quiz-setor-publico",
        titulo: "Quiz: IA no setor público brasileiro",
        tipo: "quiz",
        duracao: "15 min",
        href: "/aprender",
      },
    ],
  },
];

export function getTrilha(slug: string): Trilha | undefined {
  return trilhas.find((t) => t.slug === slug);
}
