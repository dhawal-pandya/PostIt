import { useState } from 'react';

import './App.css';

import SignIn from './Components/PageOne/SignIn/SignIn';
import SignUp from './Components/PageOne/SignUp/SignUp';
import Welcome from './Components/PageOne/Welcome/Welcome';
import Posting from './Components/PageTwo/Posting/Posting';

import Loading from './UI/Loading/Loading';

function App() {
  const [pageState, setPageState] = useState('Welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState('');

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='titlebar'>
          <h1 className='poster'>PostIt</h1>
          {pageState !== 'LoggedIn' && (
            <nav>
              <input
                className='titlebarButton'
                type='button'
                onClick={() => {
                  setPageState('SignIn');
                }}
                value='Sign In'
              />
              <input
                className='titlebarButton'
                type='button'
                onClick={() => {
                  setPageState('SignUp');
                }}
                value='Sign Up'
              />
            </nav>
          )}
          {pageState === 'LoggedIn' && (
            <nav>
              <input
                className='titlebarButton'
                type='button'
                onClick={() => {
                  setPageState('SignIn');
                }}
                value='Sign Out'
              />
            </nav>
          )}
        </div>
        {isLoading && <h1>Loading...</h1>}
        {pageState === 'Welcome' && !isLoading ? (
          <Welcome />
        ) : pageState === 'SignIn' ? (
          <SignIn
            setAuthor={setAuthor}
            setIsLoading={setIsLoading}
            setPageState={setPageState}
            pageStateChanger={setPageState}
          />
        ) : pageState === 'SignUp' ? (
          <SignUp
            setAuthor={setAuthor}
            setIsLoading={setIsLoading}
            setPageState={setPageState}
            pageStateChanger={setPageState}
          />
        ) : pageState === 'LoggedIn' ? (
          <Posting author={author} />
        ) : (
          <Loading />
        )}
      </header>
    </div>
  );
}

export default App;
