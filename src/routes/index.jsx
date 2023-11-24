import React from 'react';
import QuestionsPage from '@pages/Questions';
import CreateQuestionsPage from '@pages/CreateQuestions';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import UserLayout from '@components/layouts';
import WordGamePage from '@pages/WordGame';
import KnowledgePage from '@pages/Knowledge';

export const userRoutes = [
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/questions',
        element: <QuestionsPage />,
      },
      {
        path: '/questions/create',
        element: <CreateQuestionsPage />,
      },
      {
        path: '/word-game',
        element: <WordGamePage />,
      },
      {
        path: '/knowledge',
        element: <KnowledgePage />,
      },
    ],
  },
];

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
