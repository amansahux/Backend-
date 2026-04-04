// 🧠 Convert blendshapes → expression
export const getExpression = (shapes) => {
  const map = {};

  shapes.forEach((s) => {
    map[s.categoryName] = s.score;
  });

  const smile =
    (map.mouthSmileLeft || 0) + (map.mouthSmileRight || 0);

  const browDown =
    (map.browDownLeft || 0) + (map.browDownRight || 0);

  const eyeWide =
    (map.eyeWideLeft || 0) + (map.eyeWideRight || 0);

  const jawOpen = map.jawOpen || 0;

  if (smile > 0.7) return "Happy";
  if (jawOpen > 0.3 && eyeWide > 0.3) return "Surprised";
  if (browDown > 0.0001 && smile < 0.0001) return "Sad";

  return "Neutral";
};

// 🧠 Get most frequent expression
export const getFinalExpression = (collected) => {
  if (collected.length === 0) return "No face detected";

  const freq = {};

  collected.forEach((e) => {
    freq[e] = (freq[e] || 0) + 1;
  });

  return Object.keys(freq).reduce((a, b) =>
    freq[a] > freq[b] ? a : b
  );
};