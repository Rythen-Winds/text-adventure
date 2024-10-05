
const parseDescription = (text: string) => {
  const parsedText: (string | JSX.Element)[] = [];

  let remainingText = text;

  // Regex to match **bold** and *italic* separately
  const regex = /(\*\*(.*?)\*\*)|(\*(.*?)\*)/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(remainingText)) !== null) {
    // Push any text before the match
    if (match.index > lastIndex) {
      parsedText.push(remainingText.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // If it's a bold match (**text**)
      parsedText.push(<b key={match.index}>{match[2]}</b>);
    } else if (match[3]) {
      // If it's an italic match (*text*)
      parsedText.push(<i key={match.index}>{match[4]}</i>);
    }

    lastIndex = regex.lastIndex; // Update the last index to continue from here
  }

  // Push any remaining text after the last match
  if (lastIndex < remainingText.length) {
    parsedText.push(remainingText.slice(lastIndex));
  }

  // Wrap the parsed content in a <p> element
  return <p>{parsedText}</p>;
};

export default parseDescription;
