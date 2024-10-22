import React, { useState } from 'react';
import { Modal, Button, Steps } from 'antd';

const { Step } = Steps;

interface WelcomeTourProps {
  visible: boolean;
  onClose: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome',
      content: 'Welcome to the AI Code Editor! Let\'s take a quick tour of the main features.',
    },
    {
      title: 'Code Editor',
      content: 'This is where you write your code. It supports syntax highlighting and real-time error checking.',
    },
    {
      title: 'AI Assistance',
      content: 'As you type, the AI will provide suggestions and help you write better code.',
    },
    {
      title: 'Git Integration',
      content: 'You can manage your code versions directly from the editor using our Git integration.',
    },
    {
      title: 'Settings',
      content: 'Customize your editor experience, including themes and AI models, in the settings panel.',
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal
      title="Welcome to AI Code Editor"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ margin: '24px 0' }}>
        {steps[currentStep].content}
      </div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={onClose}>
            Get Started
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default WelcomeTour;
