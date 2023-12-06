import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  selectedQuestion: any;

  answers: string[] = [];
  selectedAnswer: string = '';

  finished: boolean = false;

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(value: string) {
    this.answers.push(value);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionIndex++;
    
    if(this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      const finaResult: string = await this.checkResult(this.answers);
      this.finished = true;
      this.selectedAnswer = quiz_questions.results[finaResult as keyof typeof quiz_questions.results];
    }

  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }
}
