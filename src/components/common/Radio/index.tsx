/**
 * 라디오 버튼 컴포넌트
 */

interface RadioOption {
  label: string;
  value: string;
}

interface RadioProps {
  options: RadioOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

export const Radio = ({ options, selectedValue, onChange }: RadioProps) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={String(option.value)}
          className="flex items-center p-4 gap-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 text-blue-600"
          />
          <span className="text-gray-900">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
