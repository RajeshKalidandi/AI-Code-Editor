import React, { useState, useEffect } from 'react';
import { List, Button, message } from 'antd';
import { getRefactoringSuggestions } from '../services/apiService';

interface RefactoringSuggestionsProps {
  code: string;
  language: string;
  onApplySuggestion: (newCode: string) => void;
}

const RefactoringSuggestions: React.FC<RefactoringSuggestionsProps> = ({ code, language, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const result = await getRefactoringSuggestions(code, language);
        setSuggestions(result);
      } catch (error) {
        message.error('Failed to fetch refactoring suggestions');
      }
    };

    fetchSuggestions();
  }, [code, language]);

  const handleApplySuggestion = (suggestion: string) => {
    onApplySuggestion(suggestion);
    message.success('Refactoring suggestion applied');
  };

  return (
    <div className="refactoring-suggestions">
      <h3>Refactoring Suggestions</h3>
      <List
        dataSource={suggestions}
        renderItem={(item, index) => (
          <List.Item>
            <div>Suggestion {index + 1}</div>
            <Button onClick={() => handleApplySuggestion(item)}>Apply</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RefactoringSuggestions;
