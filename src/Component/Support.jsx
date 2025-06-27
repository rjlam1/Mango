import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from './Theme';

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Login > Forgot Password. Enter your email to receive a reset link.",
    },
    {
      question: "How often should I water my plant?",
      answer: "Each plant has different needs. Check the 'Next Watering Date' on your plant profile.",
    },
    {
      question: "Why is my plant’s health marked poor?",
      answer: "It may be due to missed watering or environmental issues. Review care instructions.",
    },
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please write something before submitting.");
      return;
    }
    toast.success("Thank you for your feedback!");
    setFeedback('');
  };

  return (
    <section className={`max-w-8xl px-4 py-10 mx-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="w-full text-3xl font-bold text-center">Support Center</h2>
       
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'faq'
              ? 'bg-green-600 text-white'
              : `${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`
          }`}
        >
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'feedback'
              ? 'bg-green-600 text-white'
              : `${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`
          }`}
        >
          Feedback
        </button>
      </div>

      {activeTab === 'faq' && (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-4 border-l-4 rounded-xl shadow-md ${
                theme === 'dark'
                  ? 'bg-gray-800 border-green-500 text-white'
                  : 'bg-white border-green-500'
              }`}
            >
              <h3 className="text-lg font-semibold text-green-600">{faq.question}</h3>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <form
          onSubmit={handleFeedbackSubmit}
          className={`p-6 mt-4 rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <label htmlFor="feedback" className="block mb-2 font-medium">
            Share your thoughts or issues:
          </label>
          <textarea
            id="feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
              theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'
            }`}
            placeholder="Write your feedback here..."
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 mt-4 font-semibold text-white transition bg-green-600 rounded-md hover:bg-green-700"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </section>
  );
};

export default Support;
