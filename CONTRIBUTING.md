# Mudanças de estrutura da pasta app

Uma parte puxei do Angular, outras do [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). Recomendo aprender outros padrões também, como [SOA](https://aws.amazon.com/pt/what-is/service-oriented-architecture/), [hexagonal](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c) e assim por diante.

```
├── [...]
├── environments // Pasta responsável por armazenar informações que podem variar conforme ambiente (por exemplo: URL da API). Puxei a única parte boa do Angular kkkk
│   └── index.ts // Usei index.ts mesmo, pois é uma aplicação muito simples. Pode variar de acordo com o domínio para simplificar onde fica cada coisa (url.environment.ts, config.environment.ts e assim por diante)
├── services // Responsável por conter as funções com o processamento não diretamente relacionados à renderização dos componentes. Por exemplo: requisições HTTP, regras de negócio, formatação de um valor específico etc.
│   └── index.ts // Usei index.ts mesmo, pois é uma aplicação muito simples. Pode variar de acordo com o domínio para simplificar onde fica cada coisa (products.service.ts, tires.service.ts, users.service.ts e assim por diante)
├── models // Responsável por conter a modelagem interna da aplicação, com um conjunto de contratos para que fique fácil de transitar e relacionar as informações dentro do projeto.
│   └── index.ts // Usei index.ts mesmo, pois é uma aplicação muito simples. Pode variar de acordo com o domínio para simplificar onde fica cada coisa (products.model.ts, tires.model.ts, users.model.ts e assim por diante)
└── [...]
```

Como pode ver, as mudanças não foram super drásticas, mais uma mudança estrutural mesmo e algumas dicas técnicas para evoluir ao longo do tempo. Tem comentários explicando as coisas pra você entender algumas alterações feitas. Além disso, uma dica adicional: siga convenções de código. No seu freela, vc faz do jeito q vc quiser e tá td certo, mas em uma equipe, especialmente em empresas grandes, você será cobrado a escrever um código padronizado e entendível para todo mundo. Foque no simples que é sucesso! Precisando, só me chamar :D