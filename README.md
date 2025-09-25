# Vue 3 + TypeScript Assessment App

Um aplicativo de testes interativo para praticar e se preparar para entrevistas técnicas em Vue 3 e TypeScript.

## 🚀 Características

- **4 Rounds de Dificuldade**: Do iniciante ao expert
- **Timer de 25 minutos**: Simula condições reais de entrevista
- **Feedback Instantâneo**: Receba feedback imediato para cada resposta
- **Múltiplas Tentativas**: Tente até acertar cada questão
- **UI Limpa**: Interface inspirada no TestGorilla
- **Análise Detalhada**: Veja sua performance e recomendações

## 🎯 Como Usar

1. **Instale as Dependências**:
   ```bash
   npm install
   ```

2. **Execute o Aplicativo**:
   ```bash
   npm run dev
   ```

3. **Acesse**: http://localhost:5173

4. **Selecione um Round**: Escolha entre os 4 rounds disponíveis

5. **Faça o Teste**:
   - Leia cada questão cuidadosamente
   - Selecione sua resposta
   - Receba feedback instantâneo
   - Continue até completar todas as questões

6. **Veja os Resultados**: Analise sua performance e veja recomendações

## 📚 Rounds Disponíveis

### Round 1 - Iniciante
- Fundamentos do Vue 3 e TypeScript
- Composition API básica
- Reactivity System

### Round 2 - Intermediário
- Conceitos avançados
- Patterns comuns
- Gerenciamento de estado

### Round 3 - Avançado
- Expertise técnica
- Arquiteturas complexas
- Performance optimization

### Round 4 - Expert (LETHAL)
- Desafio supremo
- Cenários avançados
- Conhecimento profundo

## ⏱️ Funcionalidades do Timer

- **25 minutos** por teste
- **Aviso visual** aos 5 minutos restantes
- **Finalização automática** quando o tempo acaba
- **Modal de tempo esgotado** com opção de ver resultados

## 🎨 Interface

- Design limpo e profissional inspirado no TestGorilla
- Cores indicativas para feedback (verde/vermelho)
- Responsivo para desktop e mobile
- Animações suaves para melhor UX

## 📊 Sistema de Pontuação

- **90%+**: Excelente - Pronto para entrevista Senior!
- **80-89%**: Muito bom - Continue assim!
- **70-79%**: Bom - Quase lá!
- **60-69%**: Razoável - Precisa de mais estudo
- **40-59%**: Precisa melhorar bastante
- **<40%**: Recomendamos mais estudo

## 🔧 Tecnologias Utilizadas

- **Vue 3** (Composition API)
- **TypeScript**
- **Vue Router**
- **Pinia** (State Management)
- **Vite** (Build Tool)

## 📁 Estrutura do Projeto

```
src/
├── views/              # Páginas principais
│   ├── HomeView.vue    # Seleção de rounds
│   ├── TestView.vue    # Interface do teste
│   └── ResultsView.vue # Resultados e análise
├── stores/             # Gerenciamento de estado
│   └── assessment.ts   # Store principal
├── types/              # Definições TypeScript
│   └── assessment.ts   # Interfaces e tipos
├── utils/              # Utilitários
│   └── markdownParser.ts # Parser dos arquivos MD
└── router/             # Configuração de rotas
    └── index.ts        # Rotas principais
```

## 🎉 Boa Sorte na Entrevista!

Use este app para praticar e se sentir mais confiante na sua próxima entrevista técnica. Lembre-se: a prática leva à perfeição!

---

**Desenvolvido para ajudar desenvolvedores a se prepararem para entrevistas técnicas em Vue 3 + TypeScript.**
