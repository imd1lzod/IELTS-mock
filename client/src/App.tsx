import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import AddQuiz from './pages/AdminPage';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/admin" element={<AddQuiz />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
