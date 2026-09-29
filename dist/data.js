/* Base de dados dos imóveis — Portal dos Sonhos Capital Imobiliário.
   Todos os fatos vêm das apresentações originais do corretor. */
(function () {
  const WHATSAPP = "5512996586892";
  /* Fotos reais, otimizadas e hospedadas no próprio site.
     g/ = versão grande (galeria e destaque) · t/ = miniatura (cards). */
  const RENAME = {
    "foto_e7c88347d4ac456e85b6b505bb91640d.jpg": "01-quiosque-morros.jpg",
    "foto_60b7298bab714565bbbc7dca078d98da.jpg": "02-forno-a-lenha.jpg",
    "foto_acf27ddf5fcc482f821454a6b6ed0667.jpg": "03-quarto-casal.jpg",
    "foto_2eb46c3d730d4df5bf314c9877d82108.jpg": "04-sala-rustica.jpg",
    "foto_90d8c8b45a15412591b193991198e2d8.jpg": "05-piscina-cascata.jpg",
    "Imagem aérea da área total.jpg": "26-area-total.jpg"
  };
  const fileName = f => RENAME[f] || f.replace(/_/g, "-");

  function build(p) {
    const dir = `assets/imoveis/${p.slug}/`;
    const img = file => dir + "g/" + fileName(file);
    const thumb = file => dir + "t/" + fileName(file);
    const images = p.gallery.map(([file, label]) => ({ file, src: img(file), thumb: thumb(file), label }));
    return Object.assign(p, {
      images, img, thumb,
      cover: img(p.cover),
      coverThumb: thumb(p.cover),
      alt: p.alt ? img(p.alt) : images[1] ? images[1].src : img(p.cover),
      url: "imovel.html?id=" + p.slug,
      whatsappUrl: text => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text || p.whatsapp)}`
    });
  }

  const list = [
    {
      slug: "fazenda-vida-nova", id: "VN-06", base: "vidaNova", type: "Fazenda", mode: "Venda",
      title: "Fazenda Vida Nova", city: "Cunha-SP", region: "Serra da Bocaina",
      cover: "11-vista-aerea-casa.jpg", alt: "10-vista-aerea-sede-e-piscina.jpg", featured: true,
      video: { src: "assets/video/fazenda-vida-nova.mp4", loop: "assets/video/fazenda-vida-nova-loop.mp4", poster: "assets/video/fazenda-vida-nova-poster.jpg", title: "A Fazenda Vida Nova, apresentada pelo Ney" },
      cardFeatures: [["area", "96 alqueires (~232 ha)"], ["leaf", "20 nascentes"], ["bed", "Sede com 8 quartos"]],
      priceLabel: "Valor pedido", price: "R$ 11,04 milhões",
      kicker: "Venda · 96 alqueires em Cunha-SP",
      tagline: ["Escala para produzir.", "Estrutura para viver."],
      subtitle: "Noventa e seis alqueires paulistas, cerca de 232 hectares, com 20 nascentes e uma operação rural completa a poucos quilômetros de Cunha.",
      intro: "A Fazenda Vida Nova reúne moradia, pecuária, produção agrícola e abundância de água em uma das regiões mais valorizadas da Serra da Bocaina. Uma propriedade pronta para receber, produzir e crescer.",
      stats: [
        { v: "96", l: "alqueires paulistas (~232 ha)" },
        { v: "20", l: "nascentes na propriedade" },
        { v: "8", l: "quartos na casa-sede" },
        { v: "3", l: "galpões com maquinário" },
        { v: "~250", l: "cabeças de Nelore, à parte" }
      ],
      chapters: [
        { k: "Casa-sede", t: "Uma casa ampla, voltada para a paisagem.", img: "24-sala-com-lareira.jpg",
          x: "A sede tem oito quartos, sendo quatro com acesso a uma ampla sacada com vista para a propriedade. Sala, cozinha, sala de jantar, churrasqueira, jacuzzi e aquecimento a gás nos chuveiros completam a estrutura. Os móveis da casa-sede estão incluídos na negociação." },
        { k: "Operação", t: "Máquinas e implementos prontos para o trabalho.", img: "05-galpao-tratores.jpg",
          x: "São três galpões com maquinário, dois tratores — um Massey Ferguson 275 e um New Holland 4x4 —, grade, arado, colheitadeira, caçamba hidráulica de três toneladas, ensiladeira e outros implementos agrícolas." },
        { k: "Pecuária", t: "Estrutura completa para manejo e leite.", img: "14-curral-de-gado.jpg",
          x: "A propriedade conta com dois mangueiros de grande porte, balança, tronco, ordenha e resfriador de leite de 1.800 litros. Atualmente há aproximadamente 250 cabeças de gado Nelore de cria, que podem ser negociadas separadamente." },
        { k: "Água e produção", t: "Vinte nascentes dentro da propriedade.", img: "12-vista-aerea-fazenda.jpg",
          x: "Cerca de vinte nascentes percorrem a fazenda, e a casa-sede é abastecida por água de mina. Há área de plantio, estrutura para silagem, produção de mel, energia elétrica, internet via rádio e possibilidade de instalação da Starlink." }
      ],
      quote: { img: "09-vista-aerea-sede-e-lago.jpg", t: "Água, estrutura e escala a poucos quilômetros de Cunha." },
      highlights: [
        "Casa-sede mobiliada, com oito quartos e ampla sacada",
        "Quatro casas de caseiro e três galpões com maquinário",
        "Vinte nascentes e água de mina abastecendo a sede",
        "Dois mangueiros, balança, tronco, ordenha e resfriador de 1.800 litros",
        "Dois tratores e conjunto de implementos agrícolas",
        "Área de plantio, silagem, produção de mel, energia e internet"
      ],
      location: {
        title: "A aproximadamente 6 km de Cunha.",
        text: "Na Serra da Bocaina, com acesso a Cunha, Campos Novos de Cunha e à Rodovia Presidente Dutra. Distâncias e tempos são aproximados e devem ser confirmados no agendamento.",
        img: "08-mapa-propriedade.jpg",
        points: [
          ["Cunha", "~6 km", "Poucos quilômetros do centro da cidade."],
          ["Campos Novos", "~16 km", "Até Campos Novos de Cunha."],
          ["Via Dutra", "~1 hora", "Tempo aproximado de deslocamento."]
        ]
      },
      cta: { title: ["Conheça uma operação", "rural completa."], text: "Fale com o Ney para confirmar as informações, receber os detalhes da negociação e agendar uma visita à Fazenda Vida Nova.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre a Fazenda Vida Nova, de 96 alqueires em Cunha.",
      gallery: [
        ["09-vista-aerea-sede-e-lago.jpg", "Vista aérea da sede, do lago e das pastagens"],
        ["10-vista-aerea-sede-e-piscina.jpg", "Vista aérea da sede e da área de lazer"],
        ["11-vista-aerea-casa.jpg", "Casa-sede vista do alto"],
        ["12-vista-aerea-fazenda.jpg", "Vista ampla da Fazenda Vida Nova"],
        ["Imagem aérea da área total.jpg", "Imagem aérea da área total da propriedade"],
        ["08-mapa-propriedade.jpg", "Mapa aéreo com a estrutura da propriedade"],
        ["15-vista-montanhas.jpg", "Vista para as montanhas"],
        ["16-vista-vale.jpg", "Vista aberta do vale"],
        ["24-sala-com-lareira.jpg", "Sala de estar com lareira"],
        ["25-sala-de-jantar.jpg", "Sala de jantar da casa-sede"],
        ["18-cozinha-com-churrasqueira.jpg", "Cozinha com churrasqueira"],
        ["19-quarto-casal-com-varanda.jpg", "Quarto de casal com acesso à varanda"],
        ["01-quarto-casal.jpg", "Quarto de casal"],
        ["21-quarto-casal-2.jpg", "Segundo quarto de casal"],
        ["20-quarto-duas-camas.jpg", "Quarto com duas camas"],
        ["22-quarto-duas-camas-2.jpg", "Segundo quarto com duas camas"],
        ["23-quarto-entrada-jardim.jpg", "Quarto com entrada pelo jardim"],
        ["02-galpao-maquinas.jpg", "Galpão de máquinas"],
        ["03-galpao-implemento-azul.jpg", "Implemento agrícola no galpão"],
        ["04-galpao-trator-vermelho.jpg", "Trator no galpão"],
        ["05-galpao-tratores.jpg", "Tratores e implementos"],
        ["06-galpao-equipamentos.jpg", "Equipamentos da operação rural"],
        ["07-curral.jpg", "Estrutura coberta do curral"],
        ["13-balanca-curral.jpg", "Balança para manejo do gado"],
        ["14-curral-de-gado.jpg", "Curral e centro de manejo"],
        ["17-tanque-de-leite.jpg", "Resfriador de leite de 1.800 litros"]
      ]
    },
    {
      slug: "sitio-paiol-13-alqueires", id: "SP-07", type: "Sítio", mode: "Venda",
      title: "Sítio do Paiol", city: "Cunha-SP", region: "14 km do centro",
      cover: "01-casa-sede-entre-os-morros.jpg", alt: "02-vale-com-a-sede.jpg",
      cardFeatures: [["area", "13,5 alqueires (~32,7 ha)"], ["leaf", "Córrego e 2 nascentes"], ["leaf", "Casa sede e paiol"]],
      priceLabel: "Valor pedido", price: "R$ 1,35 milhão",
      kicker: "Venda · 13,5 alqueires em Cunha-SP",
      tagline: ["Cinquenta e dois anos", "de cuidado com a terra."],
      subtitle: "Treze alqueires e meio com córrego, duas nascentes, mata nativa, casa sede e paiol, a 14 km de Cunha. Escriturado.",
      intro: "Há terras que passam de mão em mão. Esta ficou mais de meio século com o mesmo dono: são 52 anos morando e cuidando do córrego, das nascentes e da mata. Agora, o Sítio do Paiol está à venda.",
      stats: [
        { v: "13,5", l: "alqueires (~32,7 ha)" },
        { v: "2", l: "nascentes, mais água de mina" },
        { v: "3", l: "alqueires de mata nativa" },
        { v: "3", l: "capineiras para o gado" },
        { v: "52", l: "anos com o mesmo dono" }
      ],
      chapters: [
        { k: "Água", t: "Um córrego, duas nascentes e água de mina.", img: "02-vale-com-a-sede.jpg",
          x: "Um córrego atravessa a propriedade e duas nascentes completam o abastecimento. A casa é servida por água de mina, direto da terra. No campo, não existe riqueza maior." },
        { k: "Mata", t: "Três alqueires de mata nativa.", img: "15-araucarias-e-pastagem.jpg",
          x: "Dos treze alqueires e meio, três são de mata nativa preservada. Sombra, nascente protegida e a paisagem que emoldura o vale." },
        { k: "Sede", t: "A casa sede e o paiol.", img: "04-casa-sede-e-varanda.jpg",
          x: "A casa sede, com varanda cercada de jardim, e o paiol ficam entre árvores frutíferas: bananeiras, pitaias e mangueiras. Uma estrutura de sítio de verdade, construída e mantida por quem vive ali há 52 anos." },
        { k: "Casa", t: "Fogão a lenha e casa arrumada.", img: "08-fogao-a-lenha.jpg",
          x: "Por dentro, a casa tem sala, cozinha, quarto e um fogão a lenha de azulejo branco, o coração de qualquer casa de roça. Tudo simples, limpo e cuidado, pronto para receber a próxima família." },
        { k: "Produção", t: "Capineiras, horta e curral.", img: "12-horta.jpg",
          x: "São três capineiras que garantem ração para o gado, curral de madeira, horta cercada perto da casa, pastagens espalhadas pelos morros e estrada interna cortando a propriedade. Tudo com escritura." }
      ],
      quote: { img: "03-sede-e-estrada-interna.jpg", t: "Meio século com o mesmo dono. Escritura em dia." },
      tour: {
        text: "Imagens aéreas em 360° feitas sobre o sítio. Arraste para olhar em volta, use o zoom e troque de ponto de vista.",
        scenes: [
          { id: "sede", title: "Sobre a casa sede", src: "assets/imoveis/sitio-paiol-13-alqueires/360/sobre-a-sede.jpg", preview: "assets/imoveis/sitio-paiol-13-alqueires/360/sobre-a-sede-previa.jpg", yaw: -75, pitch: -22, minPitch: -82 },
          { id: "vale", title: "Sobre o vale", src: "assets/imoveis/sitio-paiol-13-alqueires/360/sobre-o-vale.jpg", preview: "assets/imoveis/sitio-paiol-13-alqueires/360/sobre-o-vale-previa.jpg", yaw: 30, pitch: -28 },
          { id: "serra", title: "Panorama da serra", src: "assets/imoveis/sitio-paiol-13-alqueires/360/panorama-da-serra.jpg", preview: "assets/imoveis/sitio-paiol-13-alqueires/360/panorama-da-serra-previa.jpg", yaw: 0, pitch: -4, partial: true, haov: 188.2, vaov: 48.9, vOffset: -0.42 }
        ]
      },
      highlights: [
        "13,5 alqueires com escritura",
        "Córrego atravessando a propriedade",
        "Duas nascentes e água de mina",
        "Três alqueires de mata nativa",
        "Casa sede com varanda, sala, cozinha e fogão a lenha",
        "Paiol e curral de madeira",
        "Horta e jardim junto à casa",
        "Três capineiras para ração do gado",
        "Frutíferas: banana, pitaia e manga",
        "Um único dono há 52 anos"
      ],
      location: {
        title: "A 14 km de Cunha.",
        text: "No município de Cunha-SP, em meio aos morros da serra. O acesso é por um atalho em estrada de terra, sem asfalto. A localização exata é informada no agendamento da visita.",
        img: "19-panorama-da-serra.jpg",
        points: [["Cunha", "14 km", "Pelo atalho, em estrada de terra."], ["Acesso", "Sem asfalto", "Estrada de terra até a propriedade."], ["Visita", "Ponto exato", "Combinado no agendamento."]]
      },
      cta: { title: ["Meio século de história", "à espera do próximo dono."], text: "Fale com o Ney, tire suas dúvidas e marque um dia para caminhar pelo Sítio do Paiol.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre o Sítio do Paiol, de 13,5 alqueires em Cunha.",
      gallery: [
        ["01-casa-sede-entre-os-morros.jpg", "Casa sede entre os morros"],
        ["02-vale-com-a-sede.jpg", "Vale com a sede"],
        ["03-sede-e-estrada-interna.jpg", "Sede e estrada interna"],
        ["04-casa-sede-e-varanda.jpg", "Casa sede e varanda"],
        ["05-varanda.jpg", "Varanda"],
        ["06-sala.jpg", "Sala"],
        ["07-cozinha.jpg", "Cozinha"],
        ["08-fogao-a-lenha.jpg", "Fogão a lenha"],
        ["09-quarto.jpg", "Quarto"],
        ["10-corredor.jpg", "Corredor"],
        ["11-comodo-amplo.jpg", "Cômodo amplo"],
        ["12-horta.jpg", "Horta"],
        ["13-jardim-e-encosta.jpg", "Jardim e encosta"],
        ["14-orquideas-na-arvore.jpg", "Orquídeas na árvore"],
        ["15-araucarias-e-pastagem.jpg", "Araucárias e pastagem"],
        ["16-curral-no-vale.jpg", "Curral no vale"],
        ["17-curral-de-madeira.jpg", "Curral de madeira"],
        ["18-arvore-frondosa.jpg", "Árvore frondosa"],
        ["19-panorama-da-serra.jpg", "Panorama da serra"]
      ]
    },
    {
      slug: "sitio-campos-novos-12-alqueires", id: "CN-08", type: "Sítio", mode: "Venda",
      title: "Sítio Campos Novos", city: "Cunha-SP", region: "Entre Taperinha e Ponte Nova",
      zona: "Campos Novos de Cunha",
      cover: "01-vale-e-mata-nativa.jpg", alt: "02-pastagem-nativa-e-araucarias.jpg",
      video: { loop: "assets/imoveis/sitio-campos-novos-12-alqueires/video/loop.mp4", poster: "assets/imoveis/sitio-campos-novos-12-alqueires/video/poster.jpg" },
      cardFeatures: [["area", "12 alqueires (~29 ha)"], ["leaf", "3 nascentes e riacho"], ["leaf", "Sem agrotóxico, nunca"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · 12 alqueires entre Cunha e Silveiras",
      tagline: ["Terra limpa,", "do jeito que a natureza fez."],
      subtitle: "Doze alqueires de pastagem nativa, três nascentes, riacho e mata, onde nunca se usou nenhum tipo de agrotóxico.",
      intro: "Há terras que foram forçadas a produzir e terras que foram respeitadas. Aqui, nunca se jogou nenhum tipo de agrotóxico. A pastagem é nativa, sem braquiária, o riacho corre por dentro da propriedade e três nascentes brotam entre os morros.",
      stats: [
        { v: "12", l: "alqueires (~29 ha)" },
        { v: "3", l: "nascentes" },
        { v: "2", l: "hectares de mata nativa" },
        { v: "Zero", l: "agrotóxico, desde sempre" },
        { v: "36", l: "km de Cunha" }
      ],
      chapters: [
        { k: "Água", t: "Três nascentes e um riacho.", img: "03-riacho.jpg",
          x: "Três nascentes e um pequeno riacho que passa por dentro da propriedade garantem água entre os morros. Uma terra onde a água ainda corre do jeito que sempre correu." },
        { k: "Terra", t: "Nunca um agrotóxico.", img: "02-pastagem-nativa-e-araucarias.jpg",
          x: "Em toda a história da propriedade, nunca foi usado nenhum tipo de agrotóxico. Apenas uma parte do terreno é cultivada, com milho. O restante é pastagem nativa, de grama, sem braquiária." },
        { k: "Mata", t: "Dois hectares de mata nativa.", img: "01-vale-e-mata-nativa.jpg",
          x: "Dois hectares de mata nativa preservada completam a paisagem, com os morros e a serra ao fundo. Um sítio para quem quer produzir de forma limpa, criar ou simplesmente viver perto da natureza." }
      ],
      quote: { img: "10-vista-para-a-serra.jpg", t: "Terra limpa, água limpa, pastagem nativa." },
      tour: {
        text: "Imagens aéreas feitas sobre o sítio: um 360° completo e um panorama de 190° da serra, com a casa sede e a entrada da propriedade marcadas. Arraste para olhar em volta e troque de ponto de vista.",
        scenes: [
          { id: "sitio", title: "360° sobre o sítio", src: "assets/imoveis/sitio-campos-novos-12-alqueires/360/panorama-360.jpg", preview: "assets/imoveis/sitio-campos-novos-12-alqueires/360/panorama-360-previa.jpg", yaw: 60, pitch: -12,
            hotspots: [{ yaw: 67.1, pitch: -17.4, label: "Casa sede", below: true }, { yaw: 63.6, pitch: -13.1, label: "Entrada da propriedade" }] },
          { id: "serra", title: "Panorama da serra", src: "assets/imoveis/sitio-campos-novos-12-alqueires/360/panorama-180.jpg", preview: "assets/imoveis/sitio-campos-novos-12-alqueires/360/panorama-180-previa.jpg", yaw: -14, pitch: -6, partial: true, haov: 190.0, vaov: 48.4, vOffset: -0.13,
            hotspots: [{ yaw: -25.4, pitch: -17.4, label: "Casa sede", below: true }, { yaw: -28.9, pitch: -13.0, label: "Entrada da propriedade" }] }
        ]
      },
      highlights: [
        "12 alqueires, cerca de 29 hectares",
        "Três nascentes",
        "Pequeno riacho passando por dentro da propriedade",
        "Dois hectares de mata nativa",
        "Nunca foi usado nenhum tipo de agrotóxico",
        "Pastagem nativa de grama, sem braquiária",
        "Parte do terreno cultivada com milho",
        "Casa sede e entrada marcadas no tour 360°"
      ],
      location: {
        title: "Entre a Taperinha e a Ponte Nova.",
        text: "Na região de Cunha-SP, entre o bairro da Taperinha e a Ponte Nova, a 36 km de Cunha e a 28 km de Silveiras. A localização exata é informada no agendamento da visita.",
        img: "08-morros-e-serra.jpg",
        points: [["Cunha", "36 km", "Até o centro de Cunha."], ["Silveiras", "28 km", "Até o centro de Silveiras."], ["Visita", "Ponto exato", "Combinado no agendamento."]]
      },
      cta: { title: ["Terra que nunca", "conheceu veneno."], text: "Fale com o Ney, tire suas dúvidas e marque um dia para caminhar pelo Sítio Campos Novos.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre o Sítio Campos Novos, de 12 alqueires.",
      gallery: [
        ["01-vale-e-mata-nativa.jpg", "Vale e mata nativa"],
        ["02-pastagem-nativa-e-araucarias.jpg", "Pastagem nativa e araucárias"],
        ["03-riacho.jpg", "Riacho"],
        ["04-casa-e-cerca-de-madeira.jpg", "Casa e cerca de madeira"],
        ["05-casa-vista-do-alto.jpg", "Casa vista do alto"],
        ["06-casa-entre-as-pastagens.jpg", "Casa entre as pastagens"],
        ["07-rancho-de-madeira.jpg", "Rancho de madeira"],
        ["08-morros-e-serra.jpg", "Morros e serra"],
        ["09-vale-e-mata.jpg", "Vale e mata"],
        ["10-vista-para-a-serra.jpg", "Vista para a serra"]
      ]
    },
    {
      slug: "lote-campos-novos-1", id: "LT-09", type: "Lote", mode: "Venda",
      title: "Lote em Campos Novos", city: "Campos Novos de Cunha", region: "Cunha-SP",
      zona: "Campos Novos de Cunha",
      cover: "02-lote-visto-do-alto.jpg", alt: "03-medidas-do-lote.jpg",
      cardFeatures: [["area", "8,62 × 16,84 × 9,57 × 22,97 m"], ["leaf", "Água e esgoto ligados"], ["leaf", "Escriturado e desmembrado"]],
      priceLabel: "Valor", price: "R$ 75 mil",
      kicker: "Venda · Lote pronto para construir",
      tagline: ["O primeiro traço", "da sua casa na serra."],
      subtitle: "Lote escriturado e desmembrado em Campos Novos de Cunha, com água e esgoto já ligados e nenhuma pendência de família. R$ 75 mil.",
      intro: "Todo projeto de casa começa com a mesma pergunta: o terreno está em ordem? Aqui, a resposta já vem pronta. Escritura, desmembramento, água e esgoto ligados, e nenhuma pendência de família. É escolher o projeto e começar a obra.",
      stats: [
        { v: "75", l: "mil reais" },
        { v: "Escritura", l: "lote escriturado e desmembrado" },
        { v: "Ligados", l: "água e esgoto" },
        { v: "Zero", l: "pendência de família" }
      ],
      chapters: [
        { k: "Documentação", t: "Escriturado, desmembrado e sem pendência.", img: "03-medidas-do-lote.jpg",
          x: "O lote já é escriturado e desmembrado, com matrícula própria, e não tem nenhuma pendência familiar. Você compra, registra e constrói com tranquilidade." },
        { k: "Infraestrutura", t: "Água e esgoto já ligados.", img: "02-lote-visto-do-alto.jpg",
          x: "As ligações de água e esgoto já estão feitas. Menos burocracia, menos custo e menos tempo entre a compra e o primeiro tijolo." },
        { k: "Possibilidade", t: "Imagine a sua casa aqui.", img: "04-simulacao-ilustrativa.jpg",
          x: "A imagem é uma simulação ilustrativa feita por computador, apenas para mostrar o potencial do terreno: uma casa térrea com garagem e jardim. O lote é vendido sem construção, e o projeto final segue as regras de obra do município." }
      ],
      quote: { img: "01-acesso-ao-lote.jpg", t: "Terreno em ordem, obra sem surpresa." },
      highlights: [
        "Escriturado e desmembrado",
        "Água ligada",
        "Esgoto ligado",
        "Sem pendências de família",
        "Medidas: 8,62 m, 16,84 m, 9,57 m e 22,97 m",
        "Em Campos Novos de Cunha, por R$ 75 mil"
      ],
      location: {
        title: "Em Campos Novos de Cunha.",
        text: "No distrito de Campos Novos de Cunha, município de Cunha-SP. A localização exata é informada no agendamento da visita.",
        img: "01-acesso-ao-lote.jpg",
        points: [["Distrito", "Campos Novos", "Campos Novos de Cunha."], ["Município", "Cunha-SP", "Serra, interior de São Paulo."], ["Visita", "Ponto exato", "Combinado no agendamento."]]
      },
      cta: { title: ["Seu terreno", "está esperando."], text: "Fale com o Ney para ver o lote pessoalmente e tirar as dúvidas sobre a documentação.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Tenho interesse no lote de R$ 75 mil em Campos Novos de Cunha.",
      gallery: [
        ["02-lote-visto-do-alto.jpg", "Lote visto do alto"],
        ["03-medidas-do-lote.jpg", "Medidas do lote"],
        ["01-acesso-ao-lote.jpg", "Acesso ao lote"],
        ["04-simulacao-ilustrativa.jpg", "Simulação ilustrativa de uma casa no lote (não incluída)"]
      ]
    },
    {
      slug: "lote-campos-novos-2", id: "LT-10", type: "Lote", mode: "Venda",
      title: "Lote no centro de Campos Novos", city: "Campos Novos de Cunha", region: "Centro do distrito",
      zona: "Campos Novos de Cunha",
      cover: "01-lote-visto-do-alto.jpg", alt: "05-lote-visto-da-rua.jpg",
      cardFeatures: [["leaf", "Centro do distrito"], ["leaf", "Água, luz e esgoto ligados"], ["area", "Rua calçada"]],
      priceLabel: "Valor", price: "R$ 75 mil",
      kicker: "Venda · Lote no centro do distrito",
      tagline: ["No centro de Campos Novos,", "com tudo ligado."],
      subtitle: "Lote no centro do distrito de Campos Novos de Cunha, em rua calçada, com água, luz e esgoto já ligados. R$ 75 mil.",
      intro: "Morar na serra sem abrir mão da praticidade: este lote fica no centro de Campos Novos de Cunha, a poucos passos do que o distrito oferece. Rua calçada, vizinhança formada e as ligações já feitas. É chegar e começar a obra.",
      stats: [
        { v: "75", l: "mil reais" },
        { v: "Centro", l: "do distrito de Campos Novos" },
        { v: "Ligados", l: "água, luz e esgoto" },
        { v: "Calçada", l: "rua de acesso" }
      ],
      chapters: [
        { k: "Localização", t: "No coração do distrito.", img: "04-rua-calcada-no-centro.jpg",
          x: "O lote fica no centro de Campos Novos de Cunha, em rua calçada, cercado por casas e com a serra no horizonte. Tudo o que o distrito oferece, a poucos passos de casa." },
        { k: "Infraestrutura", t: "Água, luz e esgoto ligados.", img: "01-lote-visto-do-alto.jpg",
          x: "As ligações de água, luz e esgoto já estão feitas. Menos burocracia, menos custo e menos tempo entre a compra e o primeiro tijolo." },
        { k: "Possibilidade", t: "Imagine a sua casa aqui.", img: "06-simulacao-ilustrativa.jpg",
          x: "A imagem é uma simulação ilustrativa feita por computador, apenas para mostrar o potencial do terreno. O lote é vendido sem construção, e o projeto final segue as regras de obra do município." }
      ],
      quote: { img: "05-lote-visto-da-rua.jpg", t: "Perto de tudo, com a serra na janela." },
      highlights: [
        "Centro do distrito de Campos Novos de Cunha",
        "Água, luz e esgoto ligados",
        "Rua calçada",
        "Vizinhança formada",
        "R$ 75 mil"
      ],
      location: {
        title: "No centro de Campos Novos de Cunha.",
        text: "No centro do distrito de Campos Novos de Cunha, município de Cunha-SP. A localização exata é informada no agendamento da visita.",
        img: "02-lote-e-rua-de-acesso.jpg",
        points: [["Distrito", "Centro", "Campos Novos de Cunha."], ["Município", "Cunha-SP", "Serra, interior de São Paulo."], ["Visita", "Ponto exato", "Combinado no agendamento."]]
      },
      cta: { title: ["Perto de tudo,", "pronto para construir."], text: "Fale com o Ney para ver o lote pessoalmente, conhecer a rua e tirar suas dúvidas.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Tenho interesse no lote de R$ 75 mil no centro de Campos Novos de Cunha.",
      gallery: [
        ["01-lote-visto-do-alto.jpg", "Lote visto do alto"],
        ["02-lote-e-rua-de-acesso.jpg", "Lote e rua de acesso"],
        ["03-lote-e-vizinhanca.jpg", "Lote e vizinhança"],
        ["04-rua-calcada-no-centro.jpg", "Rua calçada no centro do distrito"],
        ["05-lote-visto-da-rua.jpg", "Lote visto da rua"],
        ["06-simulacao-ilustrativa.jpg", "Simulação ilustrativa de uma casa no lote (não incluída)"]
      ]
    },
    {
      slug: "sitio-bocaina", id: "BC-11", type: "Sítio", mode: "Venda",
      title: "Sítio Bocaina", city: "Cunha-SP", region: "Junto ao bairro da Bocaina",
      zona: "Campos Novos de Cunha",
      cover: "01-casa-vista-aerea.jpg", alt: "08-vale-panoramico.jpg",
      video: { src: "assets/imoveis/sitio-bocaina/video/sitio-bocaina.mp4", loop: "assets/imoveis/sitio-bocaina/video/loop.mp4", poster: "assets/imoveis/sitio-bocaina/video/poster.jpg", title: "O Sítio Bocaina visto do alto" },
      cardFeatures: [["bed", "Casa e paiol"], ["leaf", "Energia elétrica"], ["area", "10 km de Campos Novos"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · Região de Campos Novos de Cunha",
      tagline: ["A casa já está de pé.", "O resto é paisagem."],
      subtitle: "Casa, paiol e energia elétrica num vale entre morros, mata e pastagem, a 10 km do distrito de Campos Novos, junto ao bairro da Bocaina.",
      intro: "Quem procura terra no interior sabe o quanto custa começar do zero: levar energia, erguer a primeira parede, abrir caminho. No Sítio Bocaina, o começo já foi feito. A casa está de pé, a energia elétrica chegou, o paiol espera a colheita e a estrada passa ao lado. O que sobra para você é o vale, os morros e o silêncio.",
      stats: [
        { v: "1", l: "casa" },
        { v: "1", l: "paiol" },
        { v: "Com", l: "energia elétrica" },
        { v: "10", l: "km do distrito de Campos Novos" }
      ],
      chapters: [
        { k: "Casa", t: "O começo já foi feito.", img: "02-casa-lateral-e-quintal.jpg",
          x: "A casa de telhado colonial fica num patamar de grama, com quintal aberto e caixa d'água ao lado. É o ponto de partida para quem quer chegar e já ter onde ficar, reformar no seu ritmo ou ampliar do seu jeito." },
        { k: "Chegada", t: "Estrada na porta, luz na casa.", img: "06-morros-e-estrada.jpg",
          x: "A estrada de terra contorna o morro e passa rente à propriedade, e a rede de energia elétrica já chega até a casa. Um paiol completa a estrutura para guardar a colheita, as ferramentas e o que mais o sítio pedir." },
        { k: "Paisagem", t: "Um vale só de verde.", img: "07-mata-e-encosta.jpg",
          x: "Em volta, morros de pastagem, uma encosta coberta de mata, eucaliptos no fundo do vale e araucárias no alto dos morros. É a paisagem da região de Campos Novos de Cunha, onde a terra ainda tem preço de interior." }
      ],
      quote: { img: "08-vale-panoramico.jpg", t: "Casa de pé, luz acesa e um vale inteiro pela janela." },
      tour: {
        text: "Imagens aéreas feitas sobre o sítio: um 360° completo, com a casa, a estrada e a mata marcadas, e um panorama de 200° do vale. Arraste para olhar em volta e troque de ponto de vista.",
        scenes: [
          { id: "sitio", title: "360° sobre o sítio", src: "assets/imoveis/sitio-bocaina/360/panorama-360.jpg", preview: "assets/imoveis/sitio-bocaina/360/panorama-360-previa.jpg", yaw: -4, pitch: -35, minPitch: -80,
            hotspots: [{ yaw: 1.8, pitch: -63, label: "Casa" }, { yaw: -73.8, pitch: -53, label: "Estrada de acesso" }, { yaw: -7.2, pitch: -3.6, label: "Mata na encosta" }] },
          { id: "vale", title: "Panorama do vale", src: "assets/imoveis/sitio-bocaina/360/panorama-180.jpg", preview: "assets/imoveis/sitio-bocaina/360/panorama-180-previa.jpg", yaw: 0, pitch: -6, partial: true, haov: 201.1, vaov: 45.8, vOffset: -0.39 }
        ]
      },
      highlights: [
        "Casa com telhado colonial",
        "Paiol",
        "Energia elétrica",
        "Estrada de terra passando junto à propriedade",
        "Vale entre morros de pastagem",
        "Encosta com mata, eucaliptos e araucárias na paisagem",
        "A 10 km do distrito de Campos Novos de Cunha",
        "Junto ao bairro da Bocaina",
        "Tour aéreo 360° e vídeo de drone"
      ],
      location: {
        title: "Junto ao bairro da Bocaina.",
        text: "Na região de Campos Novos de Cunha-SP, ao lado do bairro da Bocaina e a 10 km do distrito de Campos Novos. A área total e a localização exata são informadas no atendimento e no agendamento da visita.",
        img: "03-estrada-e-vale.jpg",
        points: [["Campos Novos", "10 km", "Até o distrito."], ["Bocaina", "Ao lado", "Bairro vizinho ao sítio."], ["Visita", "Ponto exato", "Combinado no agendamento."]]
      },
      cta: { title: ["Chegue, abra a janela", "e comece a morar."], text: "Fale com o Ney, peça a área total e as condições, e marque um dia para conhecer o Sítio Bocaina.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre o Sítio Bocaina, perto de Campos Novos de Cunha.",
      gallery: [
        ["01-casa-vista-aerea.jpg", "Casa vista do alto"],
        ["02-casa-lateral-e-quintal.jpg", "Casa e quintal"],
        ["03-estrada-e-vale.jpg", "Estrada e vale"],
        ["04-morros-e-pastagem.jpg", "Morros e pastagem"],
        ["05-vale-e-mata.jpg", "Vale e mata"],
        ["06-morros-e-estrada.jpg", "Morros e estrada"],
        ["07-mata-e-encosta.jpg", "Mata e encosta"],
        ["08-vale-panoramico.jpg", "Vale panorâmico"]
      ]
    },
    {
      slug: "sitio-vovo-carlinhos", alt: "foto_90d8c8b45a15412591b193991198e2d8.jpg", id: "VC-02", base: "vovo", type: "Sítio", mode: "Temporada",
      title: "Sítio Vovô Carlinhos", city: "Cunha-SP", region: "Serra do Mar",
      cover: "foto_e7c88347d4ac456e85b6b505bb91640d.jpg",
      cardFeatures: [["leaf", "Piscina com cascata"], ["leaf", "Fogão e forno a lenha"], ["bed", "Quartos aconchegantes"]],
      priceLabel: "Aluguel de temporada", price: "Consulte datas",
      kicker: "Aluguel de temporada · Serra de Cunha",
      tagline: ["Onde o relógio", "anda mais devagar."],
      subtitle: "Fogão a lenha, pizza no forno, piscina com cascata e o silêncio dos morros de Cunha.",
      intro: "Na serra de Cunha, o dia começa com vista para os morros e termina com céu estrelado. O Sítio Vovô Carlinhos é feito de coisas simples, e por isso mesmo tão difíceis de encontrar.",
      stats: [
        { v: "Lenha", l: "fogão e forno de pizza" },
        { v: "Cascata", l: "na piscina, com vista" },
        { v: "Quartos", l: "decorados com carinho" },
        { v: "Serra", l: "ar puro e céu estrelado" }
      ],
      chapters: [
        { k: "O lugar", t: "O sítio ao entardecer.", img: "foto_e7c88347d4ac456e85b6b505bb91640d.jpg",
          x: "O quiosque fica cercado pelos morros verdes de Cunha. É ali que a tarde vai caindo devagar, com a luz dourada escorrendo pela serra e ninguém com pressa de ir embora." },
        { k: "Sabores da roça", t: "Fogão a lenha e pizza que estala.", img: "foto_60b7298bab714565bbbc7dca078d98da.jpg",
          x: "Nada como o aroma de comida feita no fogão a lenha, resgatando o aconchego e a tradição do campo. E para quem é apaixonado por pizza, o forno a lenha entrega massa artesanal, crocante e irresistível. A área de refeições une rusticidade e conforto, para conversas que não têm hora para acabar." },
        { k: "Descanso", t: "Durma como na casa da vó.", img: "foto_acf27ddf5fcc482f821454a6b6ed0667.jpg",
          x: "Quartos confortáveis, decorados com carinho: cama macia, roupa de cama caprichada e aquele charme do campo em cada detalhe. Aqui, acordar cedo é escolha, não obrigação." },
        { k: "Convívio", t: "A sala onde a família se reencontra.", img: "foto_2eb46c3d730d4df5bf314c9877d82108.jpg",
          x: "Um ambiente rústico e acolhedor, perfeito para reunir todo mundo depois de um dia de lazer. Jogo de cartas, prosa comprida e o cheiro de lenha vindo da cozinha." },
        { k: "Lazer", t: "Piscina com cascata, de frente para os morros.", img: "foto_90d8c8b45a15412591b193991198e2d8.jpg",
          x: "O som da água caindo, áreas verdes para todo lado e uma vista que ninguém cansa de fotografar. É o refúgio perfeito para relaxar e renovar as energias." }
      ],
      quote: { img: "foto_90d8c8b45a15412591b193991198e2d8.jpg", t: "Feito com carinho, como tudo por aqui." },
      highlights: ["Aluguel por temporada, com reserva direta pelo WhatsApp", "Fogão a lenha e forno de pizza artesanal", "Piscina com cascata e vista para os morros", "Quartos com roupa de cama caprichada", "Sala rústica para reunir a família", "Tranquilidade da serra sem abrir mão da conveniência"],
      location: {
        title: "Na serra de Cunha, perto de tudo e longe do barulho.",
        text: "Cunha fica na Serra do Mar, no alto do Vale do Paraíba, entre São Paulo e o litoral de Paraty. Uma localização que une tranquilidade e conveniência.",
        img: "foto_e7c88347d4ac456e85b6b505bb91640d.jpg",
        points: [["Cidade", "Cunha-SP", "Serra do Mar, interior de São Paulo."], ["Estadia", "Temporada", "Datas, valores e capacidade direto com o Ney."], ["Chegada", "Endereço na reserva", "A localização exata é enviada ao confirmar."]]
      },
      cta: { title: ["Reserve seus dias", "na serra."], text: "Conte quando quer vir e quantas pessoas. O Ney responde com datas livres e valores.", button: "Consultar disponibilidade", booking: true },
      whatsapp: "Olá Ney! Quero reservar uma temporada no Sítio Vovô Carlinhos, em Cunha.",
      gallery: [
        ["foto_e7c88347d4ac456e85b6b505bb91640d.jpg", "Quiosque cercado pelos morros verdes de Cunha"],
        ["foto_60b7298bab714565bbbc7dca078d98da.jpg", "Forno a lenha e mesa de refeições"],
        ["foto_acf27ddf5fcc482f821454a6b6ed0667.jpg", "Quarto com cama de casal e decoração campestre"],
        ["foto_2eb46c3d730d4df5bf314c9877d82108.jpg", "Sala de estar rústica e aconchegante"],
        ["foto_90d8c8b45a15412591b193991198e2d8.jpg", "Piscina com cascata e vista para os morros"]
      ]
    },
    {
      slug: "casa-da-matriz", alt: "11_cozinha-churrasqueira.jpg", id: "CM-01", base: "matriz", type: "Casa", mode: "Venda",
      title: "Casa da Matriz", city: "Campos de Cunha", region: "Cunha-SP",
      cover: "01_fachada-palmeiras.jpg",
      cardFeatures: [["area", "~500 m² de terreno"], ["bed", "2 quartos"], ["leaf", "2 salões comerciais"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · Centro de Campos de Cunha",
      tagline: ["Morar no centro", "e ter renda no quintal."],
      subtitle: "Casa de alvenaria a 200 metros da Igreja Matriz, com dois salões comerciais no mesmo terreno.",
      intro: "Em Campos de Cunha, a vida acontece ao redor da Matriz. A duzentos metros dela, esta casa reúne moradia pronta, uma cozinha de interior e dois pontos comerciais no mesmo terreno.",
      stats: [{ v: "~500", l: "m² de terreno" }, { v: "2", l: "quartos" }, { v: "2", l: "cozinhas" }, { v: "2", l: "vagas cobertas" }, { v: "2", l: "salões comerciais" }],
      chapters: [
        { k: "Chegada", t: "O portão de madeira e as palmeiras.", img: "05_portao-madeira.jpg",
          x: "Você abre o portão de madeira, atravessa o gramado entre as palmeiras e chega à varanda coberta. Ao fundo, a serra. A garagem para dois carros fica ao lado, com acesso direto pela entrada do lote." },
        { k: "A casa", t: "Forro de madeira e janelas em arco.", img: "14_sala-estar.jpg",
          x: "Casa de alvenaria com dois quartos, banheiro e sala. Forro de madeira, janelas em arco e piso cerâmico: uma casa de interior bem cuidada, pronta para morar." },
        { k: "Convivência", t: "Onde a família se junta.", img: "11_cozinha-churrasqueira.jpg",
          x: "São duas cozinhas: uma interna, com armários, e outra ampla e coberta, com churrasqueira e fogão a lenha em alvenaria. Espaço para mesa grande e para o domingo que começa cedo e termina tarde." },
        { k: "Renda", t: "Dois salões comerciais no quintal.", img: "08_quintal-salao.jpg",
          x: "O que separa esta casa das outras está no fundo do quintal. Em um distrito onde o comércio se concentra ao redor da Matriz, são dois pontos com movimento, para o seu próprio negócio ou para alugar. Você mora na frente, e o quintal trabalha por você." }
      ],
      quote: { img: "06_vista-serra.jpg", t: "Tudo do distrito a pé. E a serra de vista." },
      highlights: ["A 200 m da Igreja Matriz de Campos de Cunha", "Cozinha ampla com churrasqueira e fogão a lenha", "Segunda cozinha interna, com armários", "Garagem coberta para dois carros", "Dois salões comerciais para negócio ou aluguel", "Terreno de aproximadamente 500 m², com gramado"],
      location: {
        title: "A 200 metros da Igreja Matriz.",
        text: "No centro de Campos de Cunha, distrito de Cunha-SP, no alto do Vale do Paraíba.",
        img: "18_localizacao-aerea.jpg",
        points: [["Centro", "200 m da Matriz", "Tudo do distrito a pé."], ["Cunha", "30 km da sede", "Campos de Cunha é distrito de Cunha-SP."], ["Silveiras", "35 km", "Ligação com o restante do Vale do Paraíba."]]
      },
      cta: { title: ["Casa no centro", "não fica parada."], text: "Fale com o Ney, tire suas dúvidas e marque um dia para conhecer pessoalmente.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre a Casa da Matriz, em Campos de Cunha.",
      gallery: [
        ["01_fachada-palmeiras.jpg", "Casa vista da entrada, com palmeiras e a serra ao fundo"], ["02_fachada-frente.jpg", "Fachada vista do gramado"],
        ["03_fachada-detalhe.jpg", "Fachada em detalhe"], ["04_acesso-entrada.jpg", "Acesso à casa"], ["05_portao-madeira.jpg", "Portão de madeira na entrada"],
        ["06_vista-serra.jpg", "Vista da serra a partir do terreno"], ["07_vista-vale.jpg", "Vista aberta do vale"], ["08_quintal-salao.jpg", "Quintal com os salões"],
        ["09_garagem-varanda.jpg", "Garagem coberta junto à varanda"], ["10_varanda-lateral.jpg", "Varanda lateral"], ["11_cozinha-churrasqueira.jpg", "Churrasqueira e fogão a lenha"],
        ["12_cozinha-ampla.jpg", "Cozinha ampla coberta"], ["13_cozinha-interna.jpg", "Cozinha interna com armários"], ["14_sala-estar.jpg", "Sala de estar"],
        ["15_sala-tv.jpg", "Segundo ambiente de estar"], ["16_quarto-01.jpg", "Quarto 1"], ["17_quarto-02.jpg", "Quarto 2"], ["18_localizacao-aerea.jpg", "Vista aérea de Campos de Cunha"]
      ]
    },
    {
      slug: "fazenda-50-alqueires", alt: "10_vista-montanhas.jpg", id: "FA-03", base: "fazenda", type: "Fazenda", mode: "Venda",
      title: "Fazenda 50 Alqueires", city: "Cachoeira Paulista", region: "Vale do Paraíba, SP",
      cover: "09_sede-no-vale.jpg",
      cardFeatures: [["area", "50 alqueires"], ["leaf", "4 nascentes · 3 rios"], ["leaf", "2 mangueiros · 2 casas"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · Oportunidade de investimento",
      tagline: ["Terra que já", "sabe produzir."],
      subtitle: "Cinquenta alqueires com quatro nascentes, três rios, dois mangueiros e duas casas, perto da Dutra.",
      intro: "Esta fazenda nasceu leiteira. Anos de pasto, mangueiro e trabalho fizeram dela uma terra que conhece o ofício. Hoje ela também cria gado de corte, e continua pronta para a próxima safra.",
      stats: [{ v: "50", l: "alqueires" }, { v: "4", l: "nascentes" }, { v: "3", l: "rios na propriedade" }, { v: "2", l: "mangueiros" }, { v: "2", l: "casas" }],
      chapters: [
        { k: "Água", t: "Aqui, a água nunca falta.", img: "13_acude-e-cultivo.jpg",
          x: "Quatro nascentes e três rios passam dentro da propriedade, garantindo água o ano todo, em toda a extensão da fazenda. Abastecimento para o rebanho e para a lavoura, sem depender de ninguém." },
        { k: "Pecuária", t: "Estrutura de pé para leite e corte.", img: "06_mangueiro-exterior.jpg",
          x: "Dois mangueiros: um dedicado ao gado leiteiro e outro ao gado de corte. A tradição de fazenda leiteira somada ao uso atual com corte. Pasto formado e água em abundância para produzir desde o primeiro dia." },
        { k: "Sede", t: "Duas casas no coração do vale.", img: "01_duas-casas.jpg",
          x: "Duas casas compõem a sede da fazenda, com estruturas de apoio para a operação. Base para morar no campo ou administrar tudo de perto." },
        { k: "Terra", t: "Pasto ondulado, cultivo e mata.", img: "14_pasto-ondulado.jpg",
          x: "O relevo ondulado reúne pasto, áreas de cultivo, mata, eucalipto e açude. Terra que sempre produziu, à venda como oportunidade de investimento para quem não quer começar do zero." }
      ],
      quote: { img: "10_vista-montanhas.jpg", t: "Uma fazenda que não começa do zero." },
      highlights: ["Quatro nascentes e três rios dentro da divisa", "Mangueiro para gado leiteiro", "Mangueiro para gado de corte", "Duas casas formando a sede", "Pasto, áreas de cultivo, mata e açude", "Acesso próximo à Rodovia Presidente Dutra"],
      location: {
        title: "Vale do Paraíba, com acesso pela Dutra.",
        text: "A 40 km de Cachoeira Paulista, com acesso próximo à Rodovia Presidente Dutra, no interior de São Paulo. A localização exata é informada no agendamento da visita.",
        img: "12_panorama-campo.jpg",
        points: [["Referência", "40 km", "de Cachoeira Paulista."], ["Macacos", "12 km", "do Bairro dos Macacos."], ["São Miguel", "4 km", "do Bairro de São Miguel."]]
      },
      cta: { title: ["Terra que produz", "não espera."], text: "Fale com o Ney e marque um dia para percorrer a fazenda pessoalmente.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre a Fazenda de 50 alqueires em Cachoeira Paulista.",
      gallery: [
        ["09_sede-no-vale.jpg", "Sede no vale"], ["12_panorama-campo.jpg", "Panorama do campo"], ["10_vista-montanhas.jpg", "Vista das montanhas"],
        ["01_duas-casas.jpg", "As duas casas"], ["02_casa-principal.jpg", "Casa principal"], ["03_varanda.jpg", "Varanda"], ["04_lateral-casa.jpg", "Lateral da casa"],
        ["05_sede-e-flores.jpg", "Sede e flores"], ["06_mangueiro-exterior.jpg", "Mangueiro"], ["07_mangueiro-portao.jpg", "Portão do mangueiro"],
        ["08_estrutura-coberta.jpg", "Estrutura coberta"], ["11_nucleo-propriedade.jpg", "Núcleo da propriedade"], ["13_acude-e-cultivo.jpg", "Açude e cultivo"],
        ["14_pasto-ondulado.jpg", "Pasto ondulado"], ["15_vale-e-arvores.jpg", "Vale e árvores"], ["16_encosta-verde.jpg", "Encosta verde"],
        ["17_pasto-cercado.jpg", "Pasto cercado"], ["18_mata-e-eucalipto.jpg", "Mata e eucalipto"]
      ]
    },
    {
      slug: "sitio-rio-paraitinga", alt: "12_cachoeira.jpg", id: "RP-04", base: "paraitinga", type: "Sítio", mode: "Venda",
      title: "Sítio Rio Paraitinga", city: "Serra da Mantiqueira", region: "Vale do Paraíba, SP",
      cover: "04_vista-mantiqueira.jpg",
      cardFeatures: [["area", "23 alqueires (~55,7 ha)"], ["leaf", "Cachoeira própria"], ["leaf", "Escritura registrada"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · 23 alqueires à beira do rio",
      tagline: ["Água, pasto formado", "e escritura registrada."],
      subtitle: "Vinte e três alqueires às margens do Rio Paraitinga, aos pés da Serra da Mantiqueira.",
      intro: "Água é o bem mais raro do campo. Aqui, sobra: quatro nascentes, uma cachoeira dentro da divisa e um lago que reflete o entardecer, tudo às margens do Rio Paraitinga.",
      stats: [{ v: "23", l: "alqueires (~55,7 ha)" }, { v: "4", l: "nascentes" }, { v: "1", l: "cachoeira própria" }, { v: "1", l: "lago" }, { v: "100%", l: "terra formada" }],
      chapters: [
        { k: "Água", t: "Uma cachoeira dentro da divisa.", img: "12_cachoeira.jpg",
          x: "Quatro nascentes garantem água o ano todo. A cachoeira corre sobre as pedras dentro da propriedade, e o lago completa o abastecimento para o gado e para a casa." },
        { k: "Solo", t: "Feijão colhido sem adubo.", img: "16_bananal.jpg",
          x: "O feijão carioca é colhido direto do chão, sem adubo: a prova de um solo fértil de verdade. O bananal já produz e há área de cultivo aproveitável. Não é promessa de anúncio, é o que a terra entrega hoje." },
        { k: "Pasto", t: "Terra toda formada.", img: "07_pasto-formado.jpg",
          x: "Toda a área é de pasto formado, com áreas reservadas, em morros ondulados de boa cobertura verde. Curral junto ao lago e estrutura para tocar o gado desde o primeiro dia." },
        { k: "Segurança", t: "Casa-sede e escritura registrada.", img: "14_casa-sede.jpg",
          x: "A propriedade tem casa-sede e documentação regular, com escritura registrada. Segurança jurídica para comprar com tranquilidade. Você entra e trabalha." }
      ],
      quote: { img: "09_lago-entardecer.jpg", t: "Você entra e trabalha, com a Mantiqueira de vista." },
      highlights: ["Cachoeira dentro da propriedade", "Quatro nascentes e um lago", "Pasto formado e reservado", "Feijão sem adubo e bananal produzindo", "Casa-sede e curral", "Escritura registrada"],
      location: {
        title: "Aos pés da Serra da Mantiqueira.",
        text: "No Vale do Paraíba, interior de São Paulo, junto ao Rio Paraitinga. Clima de montanha, ar puro e paisagem de serra.",
        img: "01_panorama-serra.jpg",
        points: [["Rio", "Paraitinga", "Nascentes e cachoeira dentro da divisa."], ["Serra", "Mantiqueira", "Clima ameno e paisagem de montanha."], ["Visita", "Ponto exato", "Informado no agendamento, por segurança."]]
      },
      cta: { title: ["Conheça a terra", "de perto."], text: "Fale com o Ney, tire suas dúvidas e marque um dia para caminhar pela propriedade.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre o Sítio Rio Paraitinga (23 alqueires).",
      gallery: [
        ["04_vista-mantiqueira.jpg", "Vista da Mantiqueira"], ["01_panorama-serra.jpg", "Panorama da serra"], ["09_lago-entardecer.jpg", "Lago ao entardecer"],
        ["12_cachoeira.jpg", "Cachoeira própria"], ["13_cachoeira-pedras.jpg", "Cachoeira sobre pedras"], ["11_nascente.jpg", "Nascente"], ["14_casa-sede.jpg", "Casa-sede"],
        ["18_visao-geral-com-casa.jpg", "Visão geral com a casa"], ["10_lago-e-curral.jpg", "Lago e curral"], ["02_pasto-no-vale.jpg", "Pasto no vale"],
        ["07_pasto-formado.jpg", "Pasto formado"], ["05_pastagem-verde.jpg", "Pastagem verde"], ["15_pastagem-morro.jpg", "Pastagem em morro"], ["08_morros-ondulados.jpg", "Morros ondulados"],
        ["06_morros.jpg", "Morros com pasto"], ["03_colina-com-arvore.jpg", "Colina com árvore"], ["16_bananal.jpg", "Bananal"], ["17_bananal-cultivo.jpg", "Área de cultivo"]
      ]
    },
    {
      slug: "sitio-tres-nascentes", alt: "09_nascente.jpg", id: "TN-05", base: "nascentes", type: "Sítio", mode: "Venda",
      title: "Sítio das Três Nascentes", city: "Campos de Cunha", region: "Cunha-SP",
      cover: "01_panorama-serra.jpg",
      cardFeatures: [["area", "3 alqueires (~7,28 ha)"], ["leaf", "3 nascentes"], ["leaf", "~1.100 m de altitude"]],
      priceLabel: "Valor", price: "Sob consulta",
      kicker: "Venda · 1.100 metros de altitude",
      tagline: ["Três nascentes", "e o pôr do sol na serra."],
      subtitle: "Três alqueires em Campos de Cunha, a 4 km do asfalto, com água em fartura e vista aberta.",
      intro: "A 1.100 metros de altitude o ar é outro, o clima é ameno e o pôr do sol tem plateia de montanhas. Este sítio tem o que muita gente procura a vida inteira: água em fartura.",
      stats: [{ v: "3", l: "alqueires (~7,28 ha)" }, { v: "3", l: "nascentes" }, { v: "1.100", l: "metros de altitude" }, { v: "4", l: "km do asfalto" }, { v: "+10", l: "vizinhos próximos" }],
      chapters: [
        { k: "Água", t: "Tanta água que os vizinhos bebem daqui.", img: "09_nascente.jpg",
          x: "São três nascentes de excelente qualidade. A fartura é tanta que quase todos os vizinhos tiram água deste terreno. No campo, não existe patrimônio mais valioso." },
        { k: "Altitude", t: "Um ponto alto de serra.", img: "04_horizonte-montanhas.jpg",
          x: "Cerca de 1.100 metros de altitude, clima ameno e vista panorâmica. Do sítio se acompanha o pôr do sol sobre a paisagem de montanhas, todo fim de tarde." },
        { k: "Infraestrutura", t: "Serra, com o conforto chegando à porteira.", img: "07_estrada-acesso.jpg",
          x: "A rede de energia elétrica passa ao lado da propriedade, facilitando a ligação, e há internet de fibra óptica disponível na região. Tudo a apenas 4 km do asfalto." },
        { k: "Vizinhança", t: "Isolado do barulho, não das pessoas.", img: "12_vizinhanca.jpg",
          x: "Mais de dez vizinhos próximos formam uma pequena comunidade ao redor. Ideal para construir seu refúgio, plantar ou simplesmente acordar com a serra na janela." }
      ],
      quote: { img: "06_pasto-e-serra.jpg", t: "Acordar com a serra na janela." },
      highlights: ["Três nascentes de excelente qualidade", "Altitude de cerca de 1.100 metros", "Vista do pôr do sol sobre a serra", "Rede de energia ao lado", "Fibra óptica disponível na região", "A 4 km do asfalto, com mais de 10 vizinhos"],
      location: {
        title: "Em Campos de Cunha, a 4 km do asfalto.",
        text: "No município de Cunha, interior de São Paulo, em ponto de serra. O contorno aproximado da propriedade aparece nas imagens aéreas da galeria.",
        img: "15_vista-aerea-contorno.jpg",
        points: [["Município", "Campos de Cunha", "Cunha-SP, na serra do interior paulista."], ["Altitude", "~1.100 m", "Clima ameno e vista panorâmica."], ["Visita", "Ponto exato", "Acesso combinado no agendamento."]]
      },
      cta: { title: ["Venha ver o pôr do sol", "daqui."], text: "Tire suas dúvidas e marque um dia para conhecer as nascentes pessoalmente.", button: "Agendar visita" },
      whatsapp: "Olá Ney! Quero saber mais sobre o Sítio das Três Nascentes, em Campos de Cunha.",
      gallery: [
        ["01_panorama-serra.jpg", "Panorama da serra"], ["02_morros-verdes.jpg", "Morros verdes"], ["03_vista-vale.jpg", "Vista do vale"], ["04_horizonte-montanhas.jpg", "Horizonte de montanhas"],
        ["05_colinas.jpg", "Colinas"], ["06_pasto-e-serra.jpg", "Pasto e serra"], ["09_nascente.jpg", "Nascente"], ["07_estrada-acesso.jpg", "Estrada de acesso"],
        ["08_cerca-e-vista.jpg", "Cerca e vista"], ["10_arvore-no-alto.jpg", "Árvore no alto"], ["11_casa-no-vale.jpg", "Casa no vale"], ["12_vizinhanca.jpg", "Vizinhança"],
        ["13_encosta-verde.jpg", "Encosta verde"], ["14_vegetacao.jpg", "Vegetação"], ["15_vista-aerea-contorno.jpg", "Vista aérea com contorno"], ["16_area-satelite.jpg", "Área em imagem de satélite"]
      ]
    }

  ];

  window.NEY = { WHATSAPP, properties: list.map(build) };
})();
