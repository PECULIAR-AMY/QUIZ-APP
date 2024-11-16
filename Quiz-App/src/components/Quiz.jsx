import { useState, useCallback } from 'react';
import QuestionTimer from './QuestionTimer'


import QUESTIONS from './Question';
import quizCompletedImg from '../assets/quiz-complete.png';


export default function Quiz (){
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers]=useState([]);

    const activeQuestionIndex = answerState==='' ? userAnswers.length : userAnswers.length - 1
    const quizIsCompleted= activeQuestionIndex === QUESTIONS.length

     const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer){
        setAnswerState('answered')
     setUserAnswers((prevUserAnswer)=> {
     return [...prevUserAnswer, selectedAnswer]
     });

     setTimeout(() =>{
       if (selectedAnswer === QUESTIONS[activeQuestionIndex.answers[0]]) {
        setAnswerState('Correct')
       } else {
        setAnswerState('Wrong')
       }

       setTimeout(() => {
       setAnswerState(''); 
       }, 2000);
     } ,1000)
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => () => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsCompleted) {
       return (
        <div id='summary'> 
        <img  src={quizCompletedImg} alt='Trophy image '/>
        <h2>Quiz Completed!</h2>
        </div>
       )
    }

    const shuffledAnswers =  [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() =>Math.random() -0.5);

    return (
        <div id='quiz'>
        <div id='question'><h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <QuestionTimer 
        key={activeQuestionIndex} 
        timeout={10000} 
         onTimeout ={handleSkipAnswer} />
        <ul id='answers'>
        {shuffledAnswers.map((answer)=> ( 
      <li key={answer} className='answer'>
        <button onClick={() =>handleSelectAnswer(answer)} className={handleSkipAnswer}>{answer}</button>
    </li>
  ))}
      </ul>
    
</div>
        </div>


    )
}