import { Injectable } from '@angular/core';

export interface QuizQuestion {
  text: string;
  options: string[];
  answer: number;
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
}

export interface QuizResult {
  topicId: string;
  score: number;
  total: number;
  percentage: number;
  weakArea: string;
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  private questionsByTopic: Record<string, QuizQuestion[]> = {
    cabin: [
      {
        text: 'What is the first priority when boarding passengers?',
        options: [
          'Complete paperwork quickly',
          'Ensure cabin ready for guests',
          'Greet passengers politely',
          'Conduct a safety inspection'
        ],
        answer: 3
      },
      {
        text: 'Which item must be secured before takeoff?',
        options: ['Overhead bins', 'Food carts', 'Safety cards', 'Crew bag'],
        answer: 0
      },
      {
        text: 'What is the best response to a nervous passenger?',
        options: [
          'Ignore them until needed',
          'Speak calmly and reassure them',
          'Tell them to relax by themselves',
          'Offer them extra cookies'
        ],
        answer: 1
      },
      {
        text: 'What should you confirm before closing the cabin door?',
        options: [
          'Fuel status', 'Seatbelts fastened', 'Wi-Fi availability', 'Number of bags'],
        answer: 1
      },
      {
        text: 'When answering a gate inquiry, you should:',
        options: [
          'Provide a quick one-word answer', 'Ask them to check the website', 'Listen fully and respond clearly', 'Refer them to another crew member'],
          answer: 2
      },
      {
        text: 'What is the most important element of a cabin safety demonstration?',
        options: [
          'Speed', 'Clarity', 'Humor', 'Length'],
        answer: 1
      },
      {
        text: 'If a passenger leaves a bag in the aisle, you should:',
        options: [
          'Ignore it', 'Move it yourself carefully', 'Ask the passenger to move it', 'Call the pilot'],
        answer: 2
      },
      {
        text: 'A premium experience begins with:',
        options: ['A warm greeting', 'A quick announcement', 'Offering water', 'Checking seating'],
        answer: 0
      },
      {
        text: 'How should you handle a sudden crew announcement?',
        options: ['Repeat it to passengers', 'Stay silent', 'Answer with your own message', 'Wait until later'],
        answer: 0
      },
      {
        text: 'Your uniform must be:',
        options: ['Loose and casual', 'Bright and flashy', 'Clean and professional', 'Minimal and simple'],
        answer: 2
      }
    ],
    safety: [
      {
        text: 'What is the first action during an evacuation?',
        options: [
          'Collect passenger belongings',
          'Open the nearest exit after command',
          'Secure the cabin lights',
          'Call the cockpit'
        ],
        answer: 1
      },
      {
        text: 'Where is the life jacket stored?',
        options: ['Under the seat', 'In the overhead bin', 'In the galley', 'At the exit door'],
        answer: 0
      },
      {
        text: 'Which signal means fasten seatbelts?',
        options: ['Solid red light', 'Chime tone', 'Seatbelt sign', 'CABIN READY sign'],
        answer: 2
      },
      {
        text: 'In case of smoke, first you should:',
        options: [
          'Use a fire extinguisher',
          'Call the captain',
          'Alert cabin crew and assess source',
          'Tell passengers to stay seated'
        ],
        answer: 2
      },
      {
        text: 'The safest place to store heavy items is:',
        options: ['Under passenger feet', 'In overhead bins', 'In cargo hold', 'On jump seats'],
        answer: 1
      },
      {
        text: 'Before takeoff, cabin crew must:',
        options: [
          'Secure all service items',
          'Turn off all lights',
          'Lock the cockpit door',
          'Close all windows'
        ],
        answer: 0
      },
      {
        text: 'What does a rapid decompression require?',
        options: [
          'Fast landing', 'Use of oxygen masks', 'Extra announcements', 'Cabin lights off'],
        answer: 1
      },
      {
        text: 'A pre-flight walk is performed to:',
        options: [
          'Check weather', 'Inspect cabin readiness', 'Meet the captain', 'Review the route'],
        answer: 1
      },
      {
        text: 'When operating doors, the crew must:',
        options: [
          'Work alone', 'Follow the checklist', 'Wait for passengers', 'Ask the pilot first'],
        answer: 1
      },
      {
        text: 'Emergency equipment should be:',
        options: [
          'Checked visually only',
          'Stored in the cabin',
          'Inspected and accessible',
          'Hidden from passengers'],
        answer: 2
      }
    ],
    customer: [
      {
        text: 'A passenger asks for a special meal; you should:',
        options: [
          'Decline immediately', 'Check availability and respond', 'Ignore the request', 'Offer a drink instead'],
          answer: 1
      },
      {
        text: 'The best way to calm an upset guest is to:',
        options: [
          'Raise your voice', 'Listen carefully and act', 'Tell them to relax', 'Avoid eye contact'],
        answer: 1
      },
      {
        text: 'Complaints should be handled with:',
        options: ['Patience', 'Hesitation', 'Distance', 'Speed'],
        answer: 0
      },
      {
        text: 'If a passenger requires assistance, you should:',
        options: [
          'Offer help proactively', 'Wait to be asked', 'Refer to another crew', 'Provide a brochure'],
        answer: 0
      },
      {
        text: 'Quality service is anchored in:',
        options: [
          'Efficiency alone', 'Empathy and attention', 'Appearance only', 'Fast announcements'],
        answer: 1
      },
      {
        text: 'When interacting with a frequent flyer, you should:',
        options: [
          'Use formal language', 'Acknowledge their status', 'Ignore their loyalty', 'Offer them a coupon'],
        answer: 1
      },
      {
        text: 'A guest with luggage concerns should be:',
        options: [
          'Directed to baggage claim', 'Assured and informed', 'Left waiting', 'Handled later'],
        answer: 1
      },
      {
        text: 'Customer handling starts with:',
        options: [
          'Eye contact and greeting', 'A quick announcement', 'A printed card', 'A smile only'],
        answer: 0
      },
      {
        text: 'If service is delayed, you should:',
        options: [
          'Ignore the issue', 'Explain clearly', 'Avoid questions', 'Offer apologies only'],
        answer: 1
      },
      {
        text: 'Your posture when helping a guest should be:',
        options: ['Relaxed', 'Open and attentive', 'Closed', 'Distracted'],
        answer: 1
      }
    ],
    grooming: [
      {
        text: 'A polished aviation look requires:',
        options: ['Messy hair', 'Clean uniform', 'Bright makeup', 'Casual shoes'],
        answer: 1
      },
      {
        text: 'Grooming during a shift must be:',
        options: ['Flexible', 'Consistent', 'Minimal', 'Variable'],
        answer: 1
      },
      {
        text: 'Which accessory is always required?',
        options: ['Headphones', 'Name badge', 'Large jewelry', 'Sunglasses'],
        answer: 1
      },
      {
        text: 'Uniform shoes should be:',
        options: ['Scuffed', 'Polished', 'Open-toed', 'Brightly colored'],
        answer: 1
      },
      {
        text: 'Professional etiquette includes:',
        options: ['Interrupting guests', 'Respectful language', 'Over-sharing', 'Ignoring rules'],
        answer: 1
      },
      {
        text: 'Your uniform appearance should be checked:',
        options: ['At the end of the day', 'Before boarding', 'After break', 'Only by others'],
        answer: 1
      },
      {
        text: 'A neat hairstyle is:',
        options: ['Distracting', 'Secure and simple', 'Blocking vision', 'Colorful'],
        answer: 1
      },
      {
        text: 'Grooming standards are important for:',
        options: ['Personal fashion', 'Professional image', 'Speed', 'Entertainment'],
        answer: 1
      },
      {
        text: 'When talking to passengers, your tone should be:',
        options: ['Casual', 'Warm and professional', 'Slang-heavy', 'Monotone'],
        answer: 1
      },
      {
        text: 'Your badge should be visible and:',
        options: ['Hidden', 'Clear', 'Torn', 'Decorated'],
        answer: 1
      }
    ]
  };

  private answersByTopic: Record<string, number[]> = {};
  private lastResult: QuizResult | null = null;

  get topics(): QuizTopic[] {
    return [
      { id: 'cabin', title: 'Cabin Crew Interview', description: 'Practice core cabin readiness questions.' },
      { id: 'safety', title: 'Safety Procedures', description: 'Review essential safety and emergency topics.' },
      { id: 'customer', title: 'Customer Handling', description: 'Build confidence in guest service scenarios.' },
      { id: 'grooming', title: 'Grooming & Etiquette', description: 'Sharpen appearance and professional habits.' }
    ];
  }

  getQuestions(topicId: string): QuizQuestion[] {
    return this.questionsByTopic[topicId] ?? [];
  }

  startTopic(topicId: string): void {
    this.answersByTopic[topicId] = [];
    this.lastResult = null;
  }

  setAnswer(topicId: string, questionIndex: number, answerIndex: number): void {
    if (!this.answersByTopic[topicId]) {
      this.answersByTopic[topicId] = [];
    }
    this.answersByTopic[topicId][questionIndex] = answerIndex;
  }

  getAnswer(topicId: string, questionIndex: number): number | undefined {
    return this.answersByTopic[topicId]?.[questionIndex];
  }

  storeResult(topicId: string): void {
    const questions = this.getQuestions(topicId);
    const answers = this.answersByTopic[topicId] ?? [];
    const score = questions.reduce((sum, question, index) => {
      return sum + (answers[index] === question.answer ? 1 : 0);
    }, 0);

    const weakArea = this.getWeakArea(topicId, score);

    this.lastResult = {
      topicId,
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      weakArea
    };
  }

  getResult(): QuizResult | null {
    return this.lastResult;
  }

  clearResult(): void {
    this.lastResult = null;
  }

  private getWeakArea(topicId: string, score: number): string {
    const weakLines: Record<string, string[]> = {
      cabin: [
        'Boarding readiness',
        'Passenger greeting',
        'Cabin preparation',
        'Safety demonstration'
      ],
      safety: [
        'Emergency response',
        'Evacuation checks',
        'Equipment handling',
        'Pre-flight inspection'
      ],
      customer: [
        'Guest communication',
        'Complaint handling',
        'Service empathy',
        'Proactive assistance'
      ],
      grooming: [
        'Uniform presentation',
        'Professional etiquette',
        'Personal grooming',
        'Customer posture'
      ]
    };

    const bucket = weakLines[topicId] ?? ['Aviation fundamentals'];
    return bucket[score % bucket.length];
  }
}
