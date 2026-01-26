import AttentionVisualizer from './components/AttentionVisualizer';

function App() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-4xl font-bold text-white mb-8'>
        Transformer Lab
      </h1>
      <AttentionVisualizer /> 

    </div>
  )
}

export default App;