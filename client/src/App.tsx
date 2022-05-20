import './App.css'
import Header from './components/layout/Header'
import MainContent from './components/layout/MainContent'

function App() {
  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <Header />
        <div className="h-full">
          <MainContent />
        </div>
      </div>
    </div>
  )
}

export default App
