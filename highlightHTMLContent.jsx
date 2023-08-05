function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  const startTag = '<mark>';
  const endTag = '</mark>';
  let offset = 0;

  for (const position of plainTextPositions) {
    const start = position.start + offset;
    const end = position.end + offset;
    const before = htmlContent.slice(0, start);
    const content = htmlContent.slice(start, end);
    const after = htmlContent.slice(end);
    const highlightedContent = startTag + content + endTag;
    htmlContent = before + highlightedContent + after;
    offset += startTag.length + endTag.length;
  }

  return htmlContent;
}

const highlightHTMLContent = require('./highlightHTMLContent'); // Replace this with the actual file path

test('Highlights single word', () => {
  const htmlContent = '<p>This is a test content.</p>';
  const plainText = 'test';
  const plainTextPositions = [{ start: 10, end: 14 }];
  const expectedOutput = '<p>This is a <mark>test</mark> content.</p>';

  expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
});

test('Highlights multiple words', () => {
  const htmlContent = '<p>One two three four.</p>';
  const plainText = 'two three';
  const plainTextPositions = [{ start: 4, end: 14 }];
  const expectedOutput = '<p>One <mark>two three</mark> four.</p>';

  expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
});

test('Handles multiple positions', () => {
  const htmlContent = '<p>This is a test content. Another test here.</p>';
  const plainText = 'test';
  const plainTextPositions = [{ start: 10, end: 14 }, { start: 31, end: 35 }];
  const expectedOutput = '<p>This is a <mark>test</mark> content. Another <mark>test</mark> here.</p>';

  expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
});
