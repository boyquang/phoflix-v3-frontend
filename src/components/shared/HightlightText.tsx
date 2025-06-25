interface HightlightTextProps {
  parts: { text: string; highlight: boolean }[];
}

const HightlightText = ({ parts }: HightlightTextProps) => {
  return (
    <>
      {parts.map((part, index) => (
        <span key={index} className={part.highlight ? "text-primary" : ""}>
          {part.text}
        </span>
      ))}
    </>
  );
};

export default HightlightText;
