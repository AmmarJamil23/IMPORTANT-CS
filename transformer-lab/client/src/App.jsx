import React, { useState, useEffect } from 'react';
import AttentionVisualizer from './components/AttentionVisualizer';
import { checkHealth } from './services/api';
import { Activity } from 'lucide-react';

function App() {
  const [serverStatus, setServerStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const data = await checkHealth();
        setServerStatus('connected');
        console.log('Server response:', data);
      } catch (error) {
        setServerStatus('disconnected');
        console.error('Server connection failed:', error);
      }
    };
    
    checkServer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Server Status Bar */}
      <div className={`py-2 px-4 text-sm flex items-center gap-2 ${
        serverStatus === 'connected' ? 'bg-green-100 text-green-800' :
        serverStatus === 'disconnected' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        <Activity className="w-4 h-4" />
        Backend Server: {serverStatus === 'connected' ? '✓ Connected' :
                         serverStatus === 'disconnected' ? '✗ Disconnected' :
                         '○ Checking...'}
      </div>

      {/* Main Content */}
      <AttentionVisualizer />
    </div>
  );
}

export default App;