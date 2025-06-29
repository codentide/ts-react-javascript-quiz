import { Header } from './components/Header'
import { Quiz } from './components/Quiz'
import { StartButton } from './components/StartButton'
import { useQuestionStore } from './store/question'
import { QuizStats } from './components/QuizStats'
import { ResetQuizButton } from './components/QuizFooter'

function MainContent() {
  const questions = useQuestionStore((state) => state.questions)
  const isLoading = useQuestionStore((state) => state.isLoading)
  const error = useQuestionStore((state) => state.error)

  const hasQuestions: boolean = questions.length > 0
  const allQuestionsAnswered: boolean = hasQuestions
    ? questions.every((question) => question.selectedAnswer !== undefined)
    : false

  if (error)
    return (
      <>
        <span className="error-message">{error}</span>
        <ResetQuizButton children="Try Again" />
      </>
    )
  if (isLoading) return <span>Loading...</span>

  if (allQuestionsAnswered) return <QuizStats />
  else if (hasQuestions) return <Quiz />
  else return <StartButton />
}

function App() {
  return (
    <>
      <Header />
      <main className="app">
        <h1 className="app__title">Quiz Challenge</h1>

        <MainContent />
      </main>
    </>
  )
}

export default App
