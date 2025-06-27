import React from 'react';

// Using React.memo to prevent re-renders unless the password prop changes.
// This is useful in a form where other inputs might trigger parent re-renders.

interface PasswordStrengthIndicatorProps {
  /**
   * The password string to evaluate.
   */
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = React.memo(({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  /**
   * Evaluates the strength of the password and returns a score from 0 to 4.
   * 0: Empty
   * 1: Weak
   * 2: Medium
   * 3: Good
   * 4: Strong
   */
  const evaluatePasswordStrength = (pass: string): number => {
    if (!pass) return 0;

    const checks = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      symbol: /[^A-Za-z0-9]/.test(pass),
    };

    // A short password is always considered weak.
    if (!checks.length) return 1;

    let score = 0;
    if (checks.length) score++;
    // Requiring both cases is a better measure than just one.
    if (checks.uppercase && checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.symbol) score++;

    return score;
  };

  const strength = evaluatePasswordStrength(password);
  
  const strengthLabels = ["", "Weak", "Medium", "Good", "Strong"];
  
  const strengthBarColors = [
    "", // No color for level 0
    "bg-red-500",    // Weak
    "bg-yellow-500", // Medium
    "bg-blue-500",   // Good
    "bg-green-500"   // Strong
  ];

  const strengthTextColors = [
    "",
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "text-green-500",
  ];

  return (
    <div className="w-full space-y-1.5" aria-live="polite">
      <div className="grid grid-cols-4 gap-x-2">
        {Array.from({ length: 4 }).map((_, index) => {
          const barLevel = index + 1;
          return (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                strength >= barLevel ? strengthBarColors[strength] : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          );
        })}
      </div>
      {strength > 0 && (
        <p className={`text-xs text-right font-medium ${strengthTextColors[strength]}`}>
          {strengthLabels[strength]}
        </p>
      )}
    </div>
  );
});

PasswordStrengthIndicator.displayName = "PasswordStrengthIndicator";

export default PasswordStrengthIndicator;