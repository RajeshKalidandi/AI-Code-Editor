import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, GitBranch, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 dark:text-white">AI-Powered Code Editor</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Experience the future of coding with real-time AI assistance, collaborative editing, and powerful integrations.
        </p>
        <Link
          to="/editor"
          className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Coding <ArrowRight className="ml-2" />
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Code className="w-12 h-12 text-blue-500" />}
          title="Intelligent Code Completion"
          description="Get context-aware code suggestions as you type, powered by advanced AI models."
        />
        <FeatureCard
          icon={<Zap className="w-12 h-12 text-yellow-500" />}
          title="Real-time Error Detection"
          description="Catch and fix errors instantly with AI-powered diagnostics and quick fixes."
        />
        <FeatureCard
          icon={<GitBranch className="w-12 h-12 text-green-500" />}
          title="Git Integration"
          description="Seamlessly manage your code versions with built-in Git support and collaboration features."
        />
        <FeatureCard
          icon={<Sparkles className="w-12 h-12 text-purple-500" />}
          title="AI Refactoring Suggestions"
          description="Improve your code quality with intelligent refactoring recommendations."
        />
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to elevate your coding experience?</h2>
        <Link
          to="/editor"
          className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try It Now <ArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Add this section if you want to display the copyright on the homepage */}
      <div className="text-center mt-16 text-sm text-gray-600 dark:text-gray-400">
        © 2024 AI Code Editor. All rights reserved.
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default HomePage;
